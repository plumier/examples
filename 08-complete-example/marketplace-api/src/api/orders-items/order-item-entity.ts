import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { Product } from "../products/products-entity"
import { Order } from "../orders/order-entity"

@Entity()
export class OrderItem extends EntityBase {
    @ManyToOne(x => Order)
    order:Order

    @ManyToOne(x => Product)
    product:Product

    @Column()
    price: number

    @Column()
    quantity:number
}