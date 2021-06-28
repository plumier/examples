import { join } from "path"
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
            .post(`/api/shops/${shop.id}/products`)
            .send({ name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 })
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/shops/${shop.id}/products`)
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        expect(body[0]).toMatchSnapshot(ignore)
    })
    it("Should hide basePrice for non shop staff", async () => {
        const app = await createApp({ mode: "production" })
        const { staffs, shop } = await createShop(app)
        await supertest(app.callback())
            .post(`/api/shops/${shop.id}/products`)
            .send({ name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 })
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/shops/${shop.id}/products`)
            .set("Authorization", `Bearer ${userToken}`)
            .expect(200)
        expect(body[0]).toMatchSnapshot(ignore)
    })
    it("Should able adding images", async () => {
        const app = await createApp({ mode: "production" })
        const { staffs, shop } = await createShop(app)
        const { body: img1 } = await supertest(app.callback())
            .post(`/api/images/upload`)
            .attach("file", join(__dirname, "image/landscape.jpeg"))
            .set("Authorization", `Bearer ${staffs[0].token}`)
            .expect(200)
        const { body: img2 } = await supertest(app.callback())
            .post(`/api/images/upload`)
            .attach("file", join(__dirname, "image/landscape.jpeg"))
            .set("Authorization", `Bearer ${staffs[0].token}`)
            .expect(200)
        const { body: prod } = await supertest(app.callback())
            .post(`/api/shops/${shop.id}/products`)
            .send({ name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500, images: [img1.id, img2.id] })
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/shops/${shop.id}/products/${prod.id}?select=id,name,price,images`)
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        const { images, ...product } = body
        expect(product).toMatchSnapshot()
        expect(images[0]).toMatchSnapshot({ ...ignore, size: expect.any(Number) })
        expect(images[1]).toMatchSnapshot({ ...ignore, size: expect.any(Number) })
    })
})