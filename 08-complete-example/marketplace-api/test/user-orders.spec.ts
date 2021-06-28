import supertest from "supertest"

import createApp from "../src/app"
import { closeConnection, createCart, createUser, ignore } from "./_helper"


const oIgnore = { ...ignore, date: expect.any(String), user: { ...ignore }, address: { ...ignore } }

afterEach(async () => {
    await closeConnection()
})

describe("User Orders", () => {
    it("Should able to list orders", async () => {
        const app = await createApp({ mode: "production" })
        const { user } = await createCart(app)
        await supertest(app.callback())
            .post("/api/carts/checkout")
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body: orders } = await supertest(app.callback())
            .get(`/api/users/${user.id}/orders`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(orders.map((x: any) => ({ shop: x.shop.name, state: x.state }))).toMatchSnapshot()
    })
    it("Should not accessible by other user", async () => {
        const app = await createApp({ mode: "production" })
        const { user } = await createCart(app)
        const otherUser = await createUser(app, { email: "john.doe@ymail.com" })
        await supertest(app.callback())
            .post("/api/carts/checkout")
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .get(`/api/users/${user.id}/orders`)
            .set("Authorization", `Bearer ${otherUser.token}`)
            .expect(401)
    })
})