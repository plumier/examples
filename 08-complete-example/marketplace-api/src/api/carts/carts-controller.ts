import { GenericController } from "@plumier/typeorm"
import { api, bind, ControllerBuilder, JwtClaims, route } from "plumier"
import { getRepository } from "typeorm"

import { OrderItem } from "../orders-items/order-item-entity"
import { Order } from "../orders/order-entity"
import { Cart } from "./carts-entity"

const config = (c: ControllerBuilder) => {
    c.methods("Post", "Delete", "GetOne").ignore()
    c.methods("Put", "Patch").authorize("ResourceOwner")
    c.getMany().ignore()
}

@api.tag("Shopping Cart")
export class CartsController extends GenericController(Cart, config) {

    @route.ignore()
    private async getOpen(user: JwtClaims, relations: string[] = ["address"]) {
        const repo = getRepository(Cart)
        const openCart = await repo.findOne({
            where: { user: user.userId, state: "Open", deleted: false },
            relations
        })
        return openCart ?? await repo.save({ state: "Open", user: { id: user.userId } })
    }

    @route.get()
    async open(@bind.user() user: JwtClaims) {
        const { items: cartItems, ...cart } = await this.getOpen(user, ["address", "items", "items.product", "items.product.shop"])
        const items = (cartItems ?? []).map(({ product, ...ci }) => {
            return {
                id: ci.id,
                quantity: ci.quantity,
                itemId: product.id,
                itemName: product.name,
                price: product.price,
                shopId: product.shop.id,
                shopName: product.shop.name,
                subTotal: product.price * ci.quantity
            }
        })
        return { ...cart, items }
    }

    @route.post()
    async checkout(@bind.user() user: JwtClaims) {
        const cartRepo = getRepository(Cart)
        const orderRepo = getRepository(Order)
        const oItmRepo = getRepository(OrderItem)
        const cart = await this.getOpen(user)
        await cartRepo.save({ ...cart, state: "Closed" })
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
            }
            await oItmRepo.save({
                order,
                price: item.product.price,
                product: item.product,
                quantity: item.quantity
            })
        }
    }
}