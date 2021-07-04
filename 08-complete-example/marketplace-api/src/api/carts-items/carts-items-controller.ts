import { GenericController } from "@plumier/typeorm"
import { api, authorize, ControllerBuilder, entityProvider, filterParser, HttpStatusError, meta, orderParser, route, SelectQuery, val } from "plumier"
import { getRepository } from "typeorm"

import { Cart } from "../carts/carts-entity"
import { Product } from "../products/products-entity"
import { CartItemDto } from "./carts-items-dto"
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

    @route.get("")
    @meta.type([CartItemDto])
    @entityProvider(Cart, "pid")
    async list(@val.required() pid: number, offset: number, limit: number, @filterParser(x => CartItem) filter: any, @orderParser(x => CartItem) order: any) {
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
            productId: x.product.id,
            productName: x.product.name,
            productPrice: x.product.price,
            shopId: x.product.shop.id,
            shopName: x.product.shop.name
        }))
    }
}
