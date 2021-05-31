import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createUser, ignore } from "./_helper"

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
        expect(body).toMatchSnapshot(ignore)
    })
    it("Should create different chart with different user", async () => {
        const app = await createApp({ mode: "production" })
        const ali = await createUser(app)
        const ula = await createUser(app, { email: "ula.email@gmail.com" })
        const { body:aliCart } = await supertest(app.callback())
            .get(`/api/carts/open`)
            .set("Authorization", `Bearer ${ali.token}`)
            .expect(200)
        const { body:ulaCart } = await supertest(app.callback())
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
})