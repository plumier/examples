import { entityPolicy } from "plumier"
import { getRepository } from "typeorm"

import { ShopUser } from "../shops-users/shops-users-entity"
import { Shop } from "./shops-entity"


entityPolicy(Shop)
    .register("ShopOwner", async ({ user }, id) => {
        const shopUser = await getRepository(ShopUser).findOne({ where: { user: user?.userId, shop: id } })
        return shopUser?.role === "ShopOwner"
    })
    .register("ShopStaff", async ({ user }, id) => {
        const shopUser = await getRepository(ShopUser).findOne({ where: { user: user?.userId, shop: id } })
        return shopUser?.role === "ShopStaff"
    })