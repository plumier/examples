import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createShop, createUser, ignore } from "./_helper"


afterEach(async () => {
    await closeConnection()
})

describe("Shop User", () => {
    it("Should able to add user by shop owner", async () => {
        const app = await createApp({ mode: "production" })
        const { shop, owner } = await createShop(app)
        const otherUser = await createUser(app, { name: "John Doe Clone", email: "john.doe2@gmail.com" })
        await supertest(app.callback())
            .post(`/api/v1/shops/${shop.id}/users`)
            .set("Authorization", `Bearer ${owner.token}`)
            .send({ user: otherUser.id })
            .expect(200)
        const { body: result } = await supertest(app.callback())
            .get(`/api/v1/shops/${shop.id}/users`)
            .set("Authorization", `Bearer ${owner.token}`)
            .expect(200)
        expect(result[1]).toMatchSnapshot({ userId: expect.any(Number) })
    })
    it("Should restrict modify shop user by ShopStaff", async () => {
        const app = await createApp({ mode: "production" })
        const { shop, owner } = await createShop(app)
        const otherUser = await createUser(app, { name: "John Doe Clone", email: "john.doe2@gmail.com" })
        const { body } = await supertest(app.callback())
            .post(`/api/v1/shops/${shop.id}/users`)
            .set("Authorization", `Bearer ${owner.token}`)
            .send({ user: otherUser.id })
            .expect(200)
        await supertest(app.callback())
            .patch(`/api/v1/shops/${shop.id}/users/${body.id}`)
            .send({ role: "ShopOwner" })
            .set("Authorization", `Bearer ${otherUser.token}`)
            .expect(401)
    })
})