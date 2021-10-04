import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createUser, ignore } from "./_helper"

afterEach(async () => {
    await closeConnection()
})

describe("Users Shipping Addresses", () => {
    it("Should able to add multiple shipping addresses", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        await supertest(app.callback())
            .post(`/api/users/${user.id}/shipping-addresses`)
            .send({
                address: "Br. Guntur Kemenuh Blahbatuh Gianyar",
                city: "Gianyar",
                country: "Indonesia",
                zipCode: "80281",
            })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .post(`/api/users/${user.id}/shipping-addresses`)
            .send({
                address: "Br. Kemuning Blahbatuh Gianyar",
                city: "Gianyar",
                country: "Indonesia",
                zipCode: "80281",
            })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/users/${user.id}/shipping-addresses`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(body[0]).toMatchSnapshot(ignore)
        expect(body[1]).toMatchSnapshot(ignore)
    })
    it("Should able to deleted only by owner", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const otherUser = await createUser(app, { email: "other.user@gmail.com" })
        const { body: added } = await supertest(app.callback())
            .post(`/api/users/${user.id}/shipping-addresses`)
            .send({
                address: "Br. Guntur Kemenuh Blahbatuh Gianyar",
                city: "Gianyar",
                country: "Indonesia",
                zipCode: "80281",
            })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .delete(`/api/users/${user.id}/shipping-addresses/${added.id}`)
            .set("Authorization", `Bearer ${otherUser.token}`)
            .expect(403)
        await supertest(app.callback())
            .delete(`/api/users/${user.id}/shipping-addresses/${added.id}`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
    })
})