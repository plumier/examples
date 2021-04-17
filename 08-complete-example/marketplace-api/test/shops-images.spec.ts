import { join } from "path"
import supertest from "supertest"

import createApp from "../src/app"
import { createShop, ignore } from "./_helper"


describe("Shops Images", () => {
    it("Should upload file properly", async () => {
        const app = await createApp({ mode: "production" })
        const { staffs, shop } = await createShop(app)

        const { body: img } = await supertest(app.callback())
            .post(`/api/v1/shops/${shop.id}/images/upload`)
            .attach("file", join(__dirname, "image/landscape.jpeg"))
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/v1/shops/${shop.id}/images/${img.id}`)
            .set("Authorization", `Bearer ${staffs[0]?.token}`)
            .expect(200)
        expect(body).toMatchSnapshot({ ...ignore, size: expect.any(Number) })
    })
})