import { entityPolicy } from "plumier"
import { getRepository } from "typeorm"

import { Product } from "./products-entity"
import { ShopUser } from "../shops-users/shops-users-entity"


entityPolicy(Product)
    .register("ShopOwner", async ({ user }, id) => {
        const item = await getRepository(Product).findOne(id, { relations: ["shop", "shop.users"] })
        const shopUser = await getRepository(ShopUser).findOne({ where: { shop: item?.shop.id, user: user?.userId }, cache: true })
        return shopUser?.role === "ShopOwner"
    })
    .register("ShopStaff", async ({ user }, id) => {
        const item = await getRepository(Product).findOne(id, { relations: ["shop", "shop.users"] })
        const shopUser = await getRepository(ShopUser).findOne({ where: { shop: item?.shop.id, user: user?.userId }, cache: true })
        return shopUser?.role === "ShopStaff"
    })