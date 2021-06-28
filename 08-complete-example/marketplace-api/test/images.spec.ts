import { join } from "path"
import supertest from "supertest"

import createApp from "../src/app"
import { createUser } from "./_helper"


describe("Shops Images", () => {
    it("Should upload file properly", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const { body: img } = await supertest(app.callback())
            .post(`/api/images/upload`)
            .attach("file", join(__dirname, "image/landscape.jpeg"))
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(img).toMatchSnapshot()
    })
})