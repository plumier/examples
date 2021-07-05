import { authorize } from "@plumier/core"
import { api, genericController } from "plumier"
import { Column, Entity, ManyToOne, OneToMany } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { CartItem, CartItemDto } from "../carts-items/carts-items-entity"
import { ShippingAddress } from "../shipping-addresses/shipping-addresses-entity"
import { User } from "../users/users-entity"

@genericController(c => {
    c.methods("Post", "Delete", "GetMany", "Put").ignore()
    c.methods("Patch", "GetOne").authorize("ResourceOwner")
})
@api.tag("Shopping Cart")
@Entity()
export class Cart extends EntityBase {
    @authorize.readonly()
    @ManyToOne(x => User)
    user: User

    @ManyToOne(x => ShippingAddress)
    address: ShippingAddress

    @authorize.readonly()
    @Column()
    state: "Open" | "Closed"

    @genericController(c => {
        c.methods("Post").ignore()
        c.accessors().transformer(CartItemDto, (x: CartItem) => ({ ...x, subTotal: x.quantity * x.product.price }))
            .authorize("ResourceOwner")
        c.methods("Put", "Patch", "Delete", "Post").authorize("ResourceOwner")
    })
    @api.tag("Shopping Cart")
    @authorize.none()
    @OneToMany(x => CartItem, x => x.cart)
    items: CartItem[]
}

