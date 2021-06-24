import { Column, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { Product } from "../products/product-entity"
import { Order } from "./order-entity"


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