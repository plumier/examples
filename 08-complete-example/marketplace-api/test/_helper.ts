import dotenv from "dotenv"
import { sign } from "jsonwebtoken"
import { join } from "path"
import { JwtClaims } from "plumier"
import supertest from "supertest"
import { getConnection } from "typeorm"
import { Product } from "../src/api/products/product-entity"
import { Shop } from "../src/api/shops/shops-entity"
import { User } from "../src/api/users/users-entity"


dotenv.config({ path: join(__dirname, ".env-test") })

export function createToken(id: number, role: "User" | "Admin") {
    return sign(<JwtClaims>{ userId: id, role }, process.env.PLUM_JWT_SECRET!)
}

export const ignoreProps = {
    id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
}

export const userToken = createToken(123, "User")
export const adminToken = createToken(456, "Admin")

export async function createUser(app: any, user: Partial<User> = {}) {
    const { body } = await await supertest(app.callback())
        .post("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
            email: user.email ?? "john.doe@gmail.com",
            password: user.password ?? "john0doe#",
            name: user.name ?? "John Doe",
            role: user.role ?? "User"
        }).expect(200)
    const token = createToken(body.id, user.role ?? "User")
    return { id: body.id, token }
}

interface CreateShopOption {
    shop?: Partial<Shop>
    owner?: Partial<User>
    staffs?: Partial<User>[]
    items?: Partial<Product>[]
}

export async function createShop(app: any, opt?: CreateShopOption) {
    const option: CreateShopOption = {
        staffs: [{ email: "putra.staff@gmail.com", name: "Putra Mahkota Staff" }],
        items: [],
        ...opt,
    }
    const shopOwner = await createUser(app, option.owner)
    const { body } = await supertest(app.callback())
        .post("/api/shops")
        .send({ name: "Putra Mahkota", ...option.shop })
        .set("Authorization", `Bearer ${shopOwner.token}`)
        .expect(200)
    const shopStaffs = []
    for (const staff of option.staffs ?? []) {
        const result = await createUser(app, staff)
        shopStaffs.push(result)
        await supertest(app.callback())
            .post(`/api/shops/${body.id}/users`)
            .send({ user: result.id })
            .set("Authorization", `Bearer ${shopOwner.token}`)
            .expect(200)
    }
    const shopProducts = []
    for (const item of option.items ?? []) {
        const { body: addedProduct } = await supertest(app.callback())
            .post(`/api/shops/${body.id}/products`)
            .send(item)
            .set("Authorization", `Bearer ${shopOwner.token}`)
            .expect(200)
        shopProducts.push(addedProduct)
    }
    return { owner: shopOwner, staffs: shopStaffs, shop: <{ id: number }>body, products: shopProducts }
}

export async function closeConnection() {
    const con = getConnection()
    if (con.isConnected)
        await con.close()
}

export const ignore = {
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    id: expect.any(Number)
}