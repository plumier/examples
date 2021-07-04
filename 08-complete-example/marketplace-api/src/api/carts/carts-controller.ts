import { api, bind, HttpStatusError, JwtClaims, meta, route } from "plumier"
import { getRepository } from "typeorm"

import { OrderItem } from "../orders-items/order-item-entity"
import { Order } from "../orders/order-entity"
import { Cart } from "./carts-entity"

@api.tag("Shopping Cart")
export class CartsController {

    @route.ignore()
    private async getOpen(user: JwtClaims, relations: string[] = []) {
        const repo = getRepository(Cart)
        const openCart = await repo.findOne({
            where: { user: user.userId, state: "Open", deleted: false },
            relations
        })
        return openCart ?? await repo.save({ state: "Open", user: { id: user.userId } })
    }

    @route.get()
    @meta.type({ id: Number })
    async open(@bind.user() user: JwtClaims) {
        const { id } = await this.getOpen(user)
        return { id }
    }

    @route.post()
    async checkout(@bind.user() user: JwtClaims) {
        const cartRepo = getRepository(Cart)
        const orderRepo = getRepository(Order)
        const oItmRepo = getRepository(OrderItem)
        const cart = await this.getOpen(user, ["address", "items", "items.product", "items.product.shop"])
        if (!cart.address)
            throw new HttpStatusError(422, "Shipping address is required")
        const orders: { [key: number]: Order } = {}
        for (const item of cart.items) {
            const shopId = item.product.shop.id
            let order = orders[shopId]
            if (!order) {
                order = await orderRepo.save({
                    address: cart.address,
                    shop: { id: shopId },
                    state: "ReceivedBySeller",
                    user: { id: user.userId }
                })
                orders[shopId] = order
            }
            await oItmRepo.save({
                order,
                price: item.product.price,
                product: item.product,
                quantity: item.quantity
            })
        }
        await cartRepo.save({ ...cart, state: "Closed" })
    }
}