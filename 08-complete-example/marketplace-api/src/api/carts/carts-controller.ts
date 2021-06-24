import { GenericController } from "@plumier/typeorm"
import { bind, ControllerBuilder, JwtClaims, route } from "plumier"
import { getRepository } from "typeorm"

import { Cart } from "./carts-entity"

const config = (c:ControllerBuilder) => {
    c.methods("Post", "Delete", "GetOne").ignore()
    c.methods("Put", "Patch").authorize("ResourceOwner")
    c.getMany().ignore()
}

export class CartsController extends GenericController(Cart, config) {

    @route.ignore()
    private async getOpen(user: JwtClaims, relations: string[] = ["address"]) {
        const repo = getRepository(Cart)
        const openCart = await repo.findOne({
            where: { user: user.userId, state: "Open", deleted:false },
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
        const repo = getRepository(Cart)
        const cart = await this.getOpen(user)
        await repo.save({ ...cart, state: "Closed" })
    }
}