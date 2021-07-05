import { authorize, meta, val } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { Cart } from "../carts/carts-entity"
import { Product } from "../products/products-entity"
import { Shop } from "../shops/shops-entity"

@Entity()
export class CartItem extends EntityBase{
    @authorize.readonly()
    @ManyToOne(x => Cart)
    cart:Cart

    @authorize.readonly()
    @ManyToOne(x => Shop)
    shop:Shop

    @val.required()
    @ManyToOne(x => Product)
    product:Product

    @val.required()
    @Column()
    quantity:number
}

export class CartItemDto extends CartItem {
    @meta.property()
    subTotal:number
}