import { genericController } from "@plumier/generic-controller"
import { bind, JwtClaims, preSave, val } from "plumier"
import { Column, Entity, getRepository, OneToMany } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { Product } from "../products/product-entity"
import { ShopUser } from "../shops-users/shops-users-entity"

@genericController(c => {
    c.methods("Delete", "Put", "Patch").authorize("ShopOwner")
})
@Entity()
export class Shop extends EntityBase {

    @val.required()
    @Column()
    name: string

    @OneToMany(x => ShopUser, x => x.shop)
    users: ShopUser[]

    @OneToMany(x => Product, x => x.shop)
    products: Product[]

    @preSave("post")
    async setShopOwner(@bind.user() user: JwtClaims) {
        const owner = await getRepository(ShopUser).save({ user: { id: user.userId }, role: "ShopOwner" })
        this.users = [ owner ]
    }
}