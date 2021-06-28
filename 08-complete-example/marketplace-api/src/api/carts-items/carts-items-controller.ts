import { GenericController } from "@plumier/typeorm"
import { api, ControllerBuilder, HttpStatusError, meta, SelectQuery } from "plumier"
import { getRepository } from "typeorm"

import { Cart } from "../carts/carts-entity"
import { Product } from "../products/products-entity"
import { CartItemDto } from "./carts-items-dto"
import { CartItem } from "./carts-items-entity"



const config = (c: ControllerBuilder) => {
    c.accessors().authorize("ResourceOwner")
    c.methods("Put", "Patch", "Delete", "Post").authorize("ResourceOwner")
}

@api.tag("Shopping Cart")
export class CartItemController extends GenericController([Cart, "items"], config) {

    // overrides the POST /api/shop/{pid}/items 
    override async save(pid: number, data: CartItem) {
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

    @meta.type([CartItemDto])
    override async list(pid: number, offset: number, limit: number, filter: any, select: SelectQuery, order: any) {
        const repo = getRepository(CartItem)
        const items = await repo.find({ 
            where: { ...filter, cart: pid },
            take: limit,
            skip: offset,
            order: order,
            relations: ["product", "product.shop"]
        })
        return items.map(x => ({ 
            id: x.id, 
            quantity: x.quantity, 
            subTotal: x.quantity * x.product.price, 
            productId:x.product.id,
            productName: x.product.name,
            productPrice: x.product.price,
            shopId: x.product.shop.id,
            shopName: x.product.shop.name
        }))
    }
}
