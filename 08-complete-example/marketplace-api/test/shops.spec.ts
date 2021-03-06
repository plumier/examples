import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createUser, ignore, userToken } from "./_helper"


afterEach(async () => {
    await closeConnection()
})

describe("Shop", () => {
    it("Should not able to create shop without authenticated", async () => {
        const app = await createApp({ mode: "production" })
        await supertest(app.callback())
            .post("/api/shops")
            .send({ name: "Putra Mahkota" })
            .expect(401)
    })
    it("Should able to register for any login user", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        await supertest(app.callback())
            .post("/api/shops")
            .send({ name: "Putra Mahkota" })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
    })
    it("Should assign person who register as owner", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const { body } = await supertest(app.callback())
            .post("/api/shops")
            .send({ name: "Putra Mahkota" })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body: result } = await supertest(app.callback())
            .get(`/api/shops/${body.id}/users`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(result[0]).toMatchSnapshot({ userId: expect.any(Number) })
    })
    it("Should restrict other user to modify other shop", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const { body } = await supertest(app.callback())
            .post("/api/shops")
            .send({ name: "Putra Mahkota" })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .patch(`/api/shops/${body.id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .expect(403)
    })
})