import supertest from "supertest"

import createApp from "../src/app"
import { closeConnection, createShop, createUser, ignore, omitKeys } from "./_helper"

const omit = (obj: any) => omitKeys(obj, ["createdAt", "updatedAt"])

afterEach(async () => {
    await closeConnection()
})

describe("Charts Items", () => {
    it("Should add item properly", async () => {
        const app = await createApp({ mode: "production" })
        const { products } = await createShop(app, {
            items: [
                { name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 },
                { name: "Li-Ion Battery", basePrice: 200, price: 250 },
                { name: "M3 SSD 1TB", basePrice: 700, price: 900 },
            ]
        })
        const user = await createUser(app, { email: "jane.dane@gmail.com", name: "Jane Dane" })
        const { body: cart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .post(`/api/carts/${cart.id}/items`)
            .send({ product: products[0].id, quantity: 1 })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .post(`/api/carts/${cart.id}/items`)
            .send({ product: products[1].id, quantity: 2 })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .post(`/api/carts/${cart.id}/items`)
            .send({ product: products[2].id, quantity: 2 })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/carts/${cart.id}/items`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(omit(body)).toMatchSnapshot()
    })
    it("Should merge item quantity when added twice", async () => {
        const app = await createApp({ mode: "production" })
        const { products } = await createShop(app, {
            items: [
                { name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 },
                { name: "Li-Ion Battery", basePrice: 200, price: 250 },
                { name: "M3 SSD 1TB", basePrice: 700, price: 900 },
            ]
        })
        const user = await createUser(app, { email: "jane.dane@gmail.com", name: "Jane Dane" })
        const { body: cart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .post(`/api/carts/${cart.id}/items`)
            .send({ product: products[0].id, quantity: 3 })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .post(`/api/carts/${cart.id}/items`)
            .send({ product: products[0].id, quantity: 2 })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/carts/${cart.id}/items`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(omit(body)).toMatchSnapshot()
    })
    it("Should able to add from multiple shops", async () => {
        const app = await createApp({ mode: "production" })
        const { products: putraItems } = await createShop(app, {
            items: [
                { name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 },
                { name: "Li-Ion Battery", basePrice: 200, price: 250 },
                { name: "M3 SSD 1TB", basePrice: 700, price: 900 },
            ]
        })
        const { products: aliItems } = await createShop(app, {
            shop: { name: "Ali Shop" },
            owner: { email: "ali.owner@gmial.com" },
            staffs: [],
            items: [
                { name: "MacBook Pro 16 2020", basePrice: 2000, price: 2100 },
                { name: "Li-Ion Battery", basePrice: 200, price: 210 },
                { name: "M3 SSD 1TB", basePrice: 700, price: 800 },
            ]
        })
        const user = await createUser(app, { email: "jane.dane@gmail.com", name: "Jane Dane" })
        const { body: cart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .post(`/api/carts/${cart.id}/items`)
            .send({ product: putraItems[0].id, quantity: 1 })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .post(`/api/carts/${cart.id}/items`)
            .send({ product: aliItems[0].id, quantity: 1 })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/carts/${cart.id}/items`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(omit(body)).toMatchSnapshot()
    })
    it("Should not accessible by other user", async () => {
        const app = await createApp({ mode: "production" })
        const jane = await createUser(app, { email: "jane.dane@gmail.com", name: "Jane Dane" })
        const john = await createUser(app, { email: "john.doe@ymail.com" })
        const { body: cart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${jane.token}`)
            .expect(200)
        await supertest(app.callback())
            .get(`/api/carts/${cart.id}/items`)
            .set("Authorization", `Bearer ${john.token}`)
            .expect(403)
    })
})