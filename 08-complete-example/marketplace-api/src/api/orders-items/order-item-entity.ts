import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { Product } from "../products/products-entity"
import { Order } from "../orders/order-entity"
import { authorize } from "plumier"
import { Shop } from "../shops/shops-entity"

@Entity()
export class OrderItem extends EntityBase {
    @authorize.readonly()
    @ManyToOne(x => Order)
    order:Order

    @authorize.readonly()
    @ManyToOne(x => Product)
    product:Product

    @authorize.readonly()
    @ManyToOne(x => Shop)
    shop:Shop
    
    @authorize.readonly()
    @Column()
    price: number

    @authorize.readonly()
    @Column()
    quantity:number
}