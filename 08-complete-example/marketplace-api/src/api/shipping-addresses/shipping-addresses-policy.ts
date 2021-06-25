import { entityPolicy } from "plumier"
import { getRepository } from "typeorm"

import { ShippingAddress } from "./shipping-addresses-entity"



entityPolicy(ShippingAddress)
    .register("ResourceOwner", async ({ user }, id) => {
        const address = await getRepository(ShippingAddress).findOne(id, { relations: ["user"], cache: true })
        return address?.user.id === user?.userId
    })