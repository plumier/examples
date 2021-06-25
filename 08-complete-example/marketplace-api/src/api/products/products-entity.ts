import { api, authorize, genericController, val } from "plumier"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { Image } from "../images/images-entity"
import { Shop } from "../shops/shops-entity"

// /api/products
@genericController(c => {
    c.mutators().ignore()
})
@api.tag("Product List")
@Entity()
export class Product extends EntityBase {

    @authorize.readonly()
    @ManyToOne(x => Shop)
    shop:Shop 

    @val.required()
    @Column()
    name:string

    @authorize.read("ShopOwner", "ShopStaff", "Admin")
    @Column()
    basePrice:number

    @val.required()
    @Column()
    price:number

    @ManyToMany(x => Image)
    @JoinTable()
    images:Image[]
}
