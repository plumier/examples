import { CreateDateColumn, ManyToOne, OneToMany } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { ShippingAddress } from "../shipping-addresses/shipping-addresses-entity"
import { Shop } from "../shops/shops-entity"
import { User } from "../users/users-entity"
import { OrderItem } from "./order-item-entity"

export class Order extends EntityBase {
    
    @CreateDateColumn()
    date: Date

    @ManyToOne(x => Shop)
    shop:Shop

    @ManyToOne(x => User)
    user:User

    @ManyToOne(x => ShippingAddress)
    address:ShippingAddress

    @OneToMany(x => OrderItem, x => x.order)
    items: OrderItem[]
}
