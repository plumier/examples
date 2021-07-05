import { api, authorize, genericController, meta, val } from "plumier"
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

    @genericController(c => {
        c.accessors()
            .transformer(OrderItemDto, (x: OrderItem) => ({ ...x, subTotal: x.quantity * x.price }))
            .authorize("ResourceOwner", "ShopOwner", "ShopStaff")
        c.mutators().ignore()
    })
    @api.tag("User Order Management")
    @api.tag("Shop Order Management")
    @authorize.readonly()
    @OneToMany(x => OrderItem, x => x.order)
    items: OrderItem[]
}

class OrderItemDto extends OrderItem {
    @meta.property()
    subTotal: number
}
