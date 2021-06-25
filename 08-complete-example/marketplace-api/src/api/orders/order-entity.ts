import { authorize, val } from "plumier"
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { OrderItem } from "../orders-items/order-item-entity"
import { ShippingAddress } from "../shipping-addresses/shipping-addresses-entity"
import { Shop } from "../shops/shops-entity"
import { User } from "../users/users-entity"

@Entity()
export class Order extends EntityBase {

    @authorize.readonly()
    @CreateDateColumn()
    date: Date

    @Column({ default: "ReceivedBySeller" })
    @val.enums(["Issue", "ReceivedBySeller", "Prepared", "Sent", "ReceivedByBuyer"])
    state: "Issue" | "ReceivedBySeller" | "Prepared" | "Sent" | "ReceivedByBuyer"

    @authorize.readonly()
    @ManyToOne(x => Shop)
    shop: Shop

    @authorize.readonly()
    @ManyToOne(x => User)
    user: User

    @authorize.readonly()
    @ManyToOne(x => ShippingAddress)
    address: ShippingAddress

    @authorize.readonly()
    @OneToMany(x => OrderItem, x => x.order)
    items: OrderItem[]
}
