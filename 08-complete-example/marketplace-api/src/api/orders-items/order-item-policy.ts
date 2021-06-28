import { entityPolicy } from "plumier"
import { getRepository } from "typeorm"

import { ShopUser } from "../shops-users/shops-users-entity"
import { OrderItem } from "./order-item-entity"


entityPolicy(OrderItem)
    .register("ResourceOwner", async ({ user }, id) => {
        const oRepo = getRepository(OrderItem)
        const item = await oRepo.findOne(id, { relations: ["order.user"] })
        return item?.deleted === false && item.order.user.id === user?.userId
    })
    .register("ShopOwner", async ({ user }, id) => {
        const oRepo = getRepository(OrderItem)
        const uRepo = getRepository(ShopUser)
        const item = await oRepo.findOne(id, { relations: ["order.shop"] })
        const uShop = await uRepo.findOne({ where: { shop: item?.order.shop.id, user: user?.userId } })
        return item?.deleted === false && uShop?.role === "ShopOwner"
    })
    .register("ShopStaff", async ({ user }, id) => {
        const oRepo = getRepository(OrderItem)
        const uRepo = getRepository(ShopUser)
        const item = await oRepo.findOne(id, { relations: ["order.shop"] })
        const uShop = await uRepo.findOne({ where: { shop: item?.order.shop.id, user: user?.userId } })
        return item?.deleted === false && uShop?.role === "ShopStaff"
    })