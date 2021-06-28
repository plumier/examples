import { entityPolicy } from "plumier"
import { getRepository } from "typeorm"

import { Cart } from "./carts-entity"


entityPolicy(Cart).register("ResourceOwner", async ({ user }, id) => {
    const cart = await getRepository(Cart)
        .findOne(id, { relations: ["user"], cache: true })
    return cart?.state === "Open" && cart?.user.id === user?.userId && !cart.deleted
})