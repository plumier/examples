import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createShop, ignore, userToken } from "./_helper"


afterEach(async () => {
    await closeConnection()
})

describe("Shop Item", () => {
    it("Should able adding item by staff", async () => {
        const app = await createApp({ mode: "production" })
        const { staffs, shop } = await createShop(app)
        await supertest(app.callback())
            .post(`/api/v1/shops/${shop.id}/products`)
            .send({ name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 })
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/v1/shops/${shop.id}/products`)
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        expect(body[0]).toMatchSnapshot(ignore)
    })
    it("Should hide basePrice for non shop staff", async () => {
        const app = await createApp({ mode: "production" })
        const { staffs, shop } = await createShop(app)
        await supertest(app.callback())
            .post(`/api/v1/shops/${shop.id}/products`)
            .send({ name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 })
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/v1/shops/${shop.id}/products`)
            .set("Authorization", `Bearer ${userToken}`)
            .expect(200)
        expect(body[0]).toMatchSnapshot(ignore)
    })
})