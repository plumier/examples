import { entityPolicy } from "@plumier/core";
import { getRepository } from "typeorm";
import { ShopUser } from "../shops-users/shops-users-entity";
import {Image} from "./image-entity"

entityPolicy(Image)
    .register("ShopOwner", async ({user}, id) => {
        const image = await getRepository(Image).findOne(id, { relations: ["shop"] })
        const shopUser = await getRepository(ShopUser).findOne({ where: { shop: image?.shop.id, user: user?.userId } })
        return shopUser?.role === "ShopOwner"
    })
    .register("ShopStaff", async ({user}, id) => {
        const image = await getRepository(Image).findOne(id, { relations: ["shop"] })
        const shopUser = await getRepository(ShopUser).findOne({ where: { shop: image?.shop.id, user: user?.userId } })
        return shopUser?.role === "ShopStaff"
    })