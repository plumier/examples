import { entityPolicy } from "plumier"
import { getRepository } from "typeorm"
import { Cart } from "../carts/carts-entity"
import { CartItem } from "./carts-items-entity"


entityPolicy(CartItem)
    // user become CartOwner only when the state is Open, after that he not authorized to access the cart
    .register("CartOwner", async ({ user }, id) => {
        const item = await getRepository(CartItem).findOne(id, { relations: ["cart"] })
        return item?.cart.state === "Open" && item?.cart.user.id === user?.userId
    })