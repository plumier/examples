import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createCart, createUser, omitKeys } from "./_helper"

const omit = (obj: any) => omitKeys(obj, ["createdAt", "updatedAt"])

afterEach(async () => {
    await closeConnection()
})

describe("Order Items", () => {

    it("Should accessible by resource owner", async () => {
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
        const {body} = await supertest(app.callback())
            .get(`/api/orders/${orders[0].id}/items`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(omit(body)).toMatchSnapshot()
    })

    it("Should accessible by shop staff", async () => {
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
        await supertest(app.callback())
            .get(`/api/orders/${orders[0].id}/items`)
            .set("Authorization", `Bearer ${putra.staffs[0].token}`)
            .expect(200)
    })

    it("Should accessible by shop owner", async () => {
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
        await supertest(app.callback())
            .get(`/api/orders/${orders[0].id}/items`)
            .set("Authorization", `Bearer ${putra.owner.token}`)
            .expect(200)
    })

    it("Should not accessible by other user", async () => {
        const app = await createApp({ mode: "production" })
        const { user, shops: [putra] } = await createCart(app)
        const otherUser = await createUser(app, { email: "john.doe@ymail.com" })
        await supertest(app.callback())
            .post("/api/carts/checkout")
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body: orders } = await supertest(app.callback())
            .get(`/api/shops/${putra.shop.id}/orders`)
            .set("Authorization", `Bearer ${putra.staffs[0].token}`)
            .expect(200)
        await supertest(app.callback())
            .get(`/api/orders/${orders[0].id}/items`)
            .set("Authorization", `Bearer ${otherUser.token}`)
            .expect(403)
    })
})