import { genericController } from "@plumier/generic-controller"
import { authorize, val } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { Shop } from "../shops/shops-entity"

@genericController(c => {
    c.mutators().ignore()
})
@Entity()
export class Product extends EntityBase {

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
}
