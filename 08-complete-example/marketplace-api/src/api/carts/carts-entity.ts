import { authorize } from "@plumier/core"
import { Column, Entity, ManyToOne, OneToMany } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { CartItem } from "../carts-items/carts-items-entity"
import { ShippingAddress } from "../shipping-addresses/shipping-addresses-entity"
import { User } from "../users/users-entity"

@Entity()
export class Cart extends EntityBase {
    @authorize.readonly()
    @ManyToOne(x => User)
    user:User 

    @OneToMany(x => CartItem, x => x.cart)
    items:CartItem[]

    @ManyToOne(x => ShippingAddress)
    address: ShippingAddress

    @authorize.readonly()
    @Column()
    state: "Open" | "Closed"
}