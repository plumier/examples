import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createShop, createUser, ignore } from "./_helper"


afterEach(async () => {
    await closeConnection()
})

describe("Shop User", () => {
    it("Should able to add user by shop owner", async () => {
        const app = await createApp({ mode: "production" })
        const { owner: ali } = await createShop(app, {
            shop: { name: "Ali Shop" },
            owner: { email: "ali@gmail.com" },
            staffs: []
        })
        const { shop: cuteMart, owner: tia } = await createShop(app, {
            shop: { name: "Tia Shop" },
            owner: { email: "tia.shop@gmail.com" },
            staffs: []
        })
        await supertest(app.callback())
            .post(`/api/v1/shops/${cuteMart.id}/users`)
            .set("Authorization", `Bearer ${tia.token}`)
            .send({ user: ali.id })
            .expect(200)
        const { body: result } = await supertest(app.callback())
            .get(`/api/v1/users/${ali.id}/shops`)
            .set("Authorization", `Bearer ${ali.token}`)
            .expect(200)
        expect(result[0]).toMatchSnapshot({ shopId: expect.any(Number) })
        expect(result[1]).toMatchSnapshot({ shopId: expect.any(Number) })
    })
    it("Should not accessible by other user", async () => {
        const app = await createApp({ mode: "production" })
        const { owner: ali, staffs } = await createShop(app, { shop: { name: "Ali Shop" }, owner: { email: "ali@gmail.com" } })
        await supertest(app.callback())
            .get(`/api/v1/users/${ali.id}/shops`)
            .set("Authorization", `Bearer ${staffs[0].token}`)
            .expect(401)
    })
})