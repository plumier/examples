import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createCart, createUser, ignore } from "./_helper"

afterEach(async () => {
    await closeConnection()
})

describe("Carts", () => {
    it("Should create new chart when no open cart", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const { body } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(body).toMatchSnapshot()
    })
    it("Should create different chart with different user", async () => {
        const app = await createApp({ mode: "production" })
        const ali = await createUser(app)
        const ula = await createUser(app, { email: "ula.email@gmail.com" })
        const { body: aliCart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${ali.token}`)
            .expect(200)
        const { body: ulaCart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${ula.token}`)
            .expect(200)
        expect(aliCart.id !== ulaCart.id).toBe(true)
    })
    it("Should not create a new cart when already opened one", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const { body: first } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body: second } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(first.id === second.id).toBe(true)
    })
    it("Should able to assign shipping address", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const { body: shipping } = await supertest(app.callback())
            .post(`/api/users/${user.id}/shipping-addresses`)
            .send({
                address: "Br. Guntur Kemenuh Blahbatuh Gianyar",
                city: "Gianyar",
                country: "Indonesia",
                zipCode: "80281",
            })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body: cart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .patch(`/api/carts/${cart.id}`)
            .send({ address: shipping.id })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/carts/${cart.id}`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(body).toMatchSnapshot({ ...ignore, address: ignore, user: ignore })
    })
    it("Should not able to set by other user", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const otherUser = await createUser(app, { email: "john.doe@ymail.com" })
        const { body: shipping } = await supertest(app.callback())
            .post(`/api/users/${otherUser.id}/shipping-addresses`)
            .send({
                address: "Br. Guntur Kemenuh Blahbatuh Gianyar",
                city: "Gianyar",
                country: "Indonesia",
                zipCode: "80281",
            })
            .set("Authorization", `Bearer ${otherUser.token}`)
            .expect(200)
        const { body: cart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .patch(`/api/carts/${cart.id}`)
            .send({ address: shipping.id })
            .set("Authorization", `Bearer ${otherUser.token}`)
            .expect(401)
    })
    it("Should checkout cart properly", async () => {
        const app = await createApp({ mode: "production" })
        const cart = await createCart(app)
        await supertest(app.callback())
            .post("/api/carts/checkout")
            .set("Authorization", `Bearer ${cart.user.token}`)
            .expect(200)
        const { body: orders } = await supertest(app.callback())
            .get(`/api/users/${cart.user.id}/orders`)
            .set("Authorization", `Bearer ${cart.user.token}`)
            .expect(200)
        expect(orders.map((x: any) => ({ shop: x.shop.name, state: x.state }))).toMatchSnapshot()
    })
    it("Should not able to access checked cart", async () => {
        const app = await createApp({ mode: "production" })
        const cart = await createCart(app)
        await supertest(app.callback())
            .post("/api/carts/checkout")
            .set("Authorization", `Bearer ${cart.user.token}`)
            .expect(200)
        await supertest(app.callback())
            .get(`/api/carts/${cart.id}`)
            .set("Authorization", `Bearer ${cart.user.token}`)
            .expect(401)
    })
})