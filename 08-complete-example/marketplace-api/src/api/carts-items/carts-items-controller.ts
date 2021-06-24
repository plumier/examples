import { GenericController } from "@plumier/typeorm"
import { ControllerBuilder, HttpStatusError } from "plumier"
import { getRepository } from "typeorm"

import { Cart } from "../carts/carts-entity"
import { Product } from "../products/product-entity"
import { CartItem } from "./carts-items-entity"

const config = (c:ControllerBuilder) => {
    c.methods("GetMany", "GetOne").ignore()
    c.methods("Put", "Patch", "Delete", "Post").authorize("ResourceOwner")
}

export class CartItemController extends GenericController([Cart, "items"], config) {
    async save(pid: number, data: CartItem) {
        const cartItemRepo = getRepository(CartItem)
        const cartRepo = getRepository(Cart)
        const itemRepo = getRepository(Product)
        const cart = await cartRepo.findOne(pid)
        if (!cart) throw new HttpStatusError(404, "Cart not found")
        const item = await itemRepo.findOne(data.product.id)
        if (!item) throw new HttpStatusError(400, "Invalid item id provided")
        const exists = await cartItemRepo.findOne({ where: { cart: cart.id, product: item.id } })
        if (exists) {
            exists.quantity += data.quantity
            await cartItemRepo.save(exists)
            return exists
        }
        else {
            const inserted = await cartItemRepo.save({ ...data, cart: { id: cart.id } })
            return { id: inserted.id }
        }
    }
}
