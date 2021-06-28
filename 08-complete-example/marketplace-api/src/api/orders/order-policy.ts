import { entityPolicy } from "plumier";
import { getRepository } from "typeorm";
import { ShopUser } from "../shops-users/shops-users-entity";
import { Order } from "./order-entity";


entityPolicy(Order)
    .register("ResourceOwner", async ({ user }, id) => {
        const repo = getRepository(Order)
        const order = await repo.findOne(id, { relations: ["user"] })
        return order?.deleted === false && order.user.id === user?.userId
    })
    .register("ShopOwner", async ({ user }, id) => {
        const oRepo = getRepository(Order)
        const uRepo = getRepository(ShopUser)
        const order = await oRepo.findOne(id, { relations: ["shop"] })
        const uShop = await uRepo.findOne({ where: { shop: order?.shop.id, user: user?.userId } })
        return order?.deleted === false && uShop?.role === "ShopOwner"
    })
    .register("ShopStaff", async ({ user }, id) => {
        const oRepo = getRepository(Order)
        const uRepo = getRepository(ShopUser)
        const order = await oRepo.findOne(id, { relations: ["shop"] })
        const uShop = await uRepo.findOne({ where: { shop: order?.shop.id, user: user?.userId } })
        return order?.deleted === false && uShop?.role === "ShopStaff"
    })