import { api, authorize, entityProvider, HttpStatusError, route, val } from "plumier"
import { getRepository } from "typeorm"

import { Cart } from "../carts/carts-entity"
import { Product } from "../products/products-entity"
import { CartItem } from "./carts-items-entity"


@api.tag("Shopping Cart")
@route.root("carts/:pid/items")
@authorize.route("ResourceOwner")
export class CartItemController {

    @route.post("")
    @entityProvider(Cart, "pid")
    async save(@val.required() pid: number, data: CartItem) {
        const cartItemRepo = getRepository(CartItem)
        const cartRepo = getRepository(Cart)
        const itemRepo = getRepository(Product)
        const cart = await cartRepo.findOne(pid)
        if (!cart) throw new HttpStatusError(404, "Cart not found")
        const item = await itemRepo.findOne(data.product.id, { relations: ["shop"] })
        if (!item) throw new HttpStatusError(400, "Invalid item id provided")
        const exists = await cartItemRepo.findOne({ where: { cart: cart.id, product: item.id } })
        if (exists) {
            exists.quantity += data.quantity
            await cartItemRepo.save(exists)
            return exists
        }
        else {
            const inserted = await cartItemRepo.save({ ...data, cart: { id: cart.id }, shop: item.shop })
            return { id: inserted.id }
        }
    }
}
