import dotenv from "dotenv"
import { sign } from "jsonwebtoken"
import { join } from "path"
import { JwtClaims } from "plumier"
import supertest from "supertest"
import { getConnection } from "typeorm"
import { Product } from "../src/api/products/products-entity"
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

export async function createCart(app: any) {
    const { products, ...putra } = await createShop(app, {
        items: [
            { name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 },
            { name: "Li-Ion Battery", basePrice: 200, price: 250 },
            { name: "M3 SSD 1TB", basePrice: 700, price: 900 },
        ]
    })
    const { products: aliItems, ...ali } = await createShop(app, {
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
    await supertest(app.callback())
        .post(`/api/carts/${cart.id}/items`)
        .send({ product: aliItems[0].id, quantity: 1 })
        .set("Authorization", `Bearer ${user.token}`)
        .expect(200)
    // add shipping address
    const { body: address } = await supertest(app.callback())
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
        .patch(`/api/carts/${cart.id}`)
        .send({ address: address.id })
        .set("Authorization", `Bearer ${user.token}`)
        .expect(200)
    return { id: cart.id, user, shops: [putra, ali] }
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