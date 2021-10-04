import supertest from "supertest"

import createApp from "../src/app"
import { closeConnection, createCart, ignore } from "./_helper"


const oIgnore = { ...ignore, date: expect.any(String), user: { ...ignore }, address: { ...ignore } }

afterEach(async () => {
    await closeConnection()
})

describe("Shop Orders", () => {
    it("Should able to list orders", async () => {
        const app = await createApp({ mode: "production" })
        const { user, shops: [putra] } = await createCart(app)
        await supertest(app.callback())
            .post("/api/carts/checkout")
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body: orders } = await supertest(app.callback())
            .get(`/api/shops/${putra.shop.id}/orders`)
            .set("Authorization", `Bearer ${putra.staffs[0].token}`)
            .expect(200)
        expect(orders[0]).toMatchSnapshot(oIgnore)
    })
    it("Should accessible by owner", async () => {
        const app = await createApp({ mode: "production" })
        const { user, shops: [putra] } = await createCart(app)
        await supertest(app.callback())
            .post("/api/carts/checkout")
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .get(`/api/shops/${putra.shop.id}/orders`)
            .set("Authorization", `Bearer ${putra.owner.token}`)
            .expect(200)
    })
    it("Should not accessible by non shop user", async () => {
        const app = await createApp({ mode: "production" })
        const { user, shops: [putra, ali] } = await createCart(app)
        await supertest(app.callback())
            .post("/api/carts/checkout")
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .get(`/api/shops/${putra.shop.id}/orders`)
            .set("Authorization", `Bearer ${ali.owner.token}`)
            .expect(403)
    })
})