import { entityPolicy } from "plumier"
import { getRepository } from "typeorm"

import { Cart } from "./carts-entity"


entityPolicy(Cart)
    // user become CartOwner only when the state is Open, after that he not authorized to access the cart
    .register("ResourceOwner", async ({ user }, id) => {
        const cart = await getRepository(Cart).findOne(id, { relations: ["user"], cache: true })
        return cart?.state === "Open" && cart?.user.id === user?.userId
    })