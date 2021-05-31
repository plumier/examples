import { entityPolicy } from "plumier"
import { getRepository } from "typeorm"

import { ShopUser } from "./shops-users-entity"


entityPolicy(ShopUser)
    .register("ShopOwner", async ({ user }, id) => {
        const shopUser = await getRepository(ShopUser).findOne(id, { relations: ["user"], cache: true })
        return shopUser?.user.id === user?.userId && shopUser?.role === "ShopOwner"
    })
    .register("ShopStaff", async ({ user }, id) => {
        const shopUser = await getRepository(ShopUser).findOne(id, { relations: ["user"], cache: true })
        return shopUser?.user.id === user?.userId && shopUser?.role === "ShopStaff"
    })
