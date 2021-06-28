import { noop } from "@plumier/reflect"
import { api, authorize, bind, ControllerBuilder, genericController, JwtClaims, meta, preSave, val } from "plumier"
import { Column, Entity, getRepository, OneToMany } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { Order } from "../orders/order-entity"
import { Product } from "../products/products-entity"
import { ShopUser } from "../shops-users/shops-users-entity"


// /api/shops
@genericController(c => {
    c.methods("Delete", "Put", "Patch").authorize("ShopOwner")
})
@api.tag("Shop Management")
@Entity()
export class Shop extends EntityBase {

    @val.required()
    @Column()
    name: string

    // /api/shops/{pid}/users 
    @genericController(c => {
        c.mutators().authorize("ShopOwner")
        c.accessors().authorize("ShopOwner", "ShopStaff")
            .transformer(ShopUserDto, transformer)
    })
    @api.tag("Shop User Management")
    @authorize.none()
    @OneToMany(x => ShopUser, x => x.shop)
    users: ShopUser[]

    // /api/shops/{pid}/products
    @genericController(c => {
        c.mutators().authorize("ShopOwner", "ShopStaff")
    })
    @api.tag("Shop Product Management")
    @authorize.none()
    @OneToMany(x => Product, x => x.shop)
    products: Product[]

    // /api/shops/{pid}/orders
    @genericController(c => {
        c.mutators().ignore()
        c.accessors().authorize("ShopOwner", "ShopStaff")
    })
    @api.tag("Shop Order Management")
    @authorize.none()
    @OneToMany(x => Order, x => x.shop)
    orders: Order[]

    @preSave("post")
    async setShopOwner(@bind.user() user: JwtClaims) {
        const owner = await getRepository(ShopUser)
            .save({ user: { id: user.userId }, role: "ShopOwner" })
        this.users = [owner]
    }
}

const transformer = (x: ShopUser) => ({
    userId: x.user.id,
    name: x.user.name,
    role: x.role
})

export class ShopUserDto {
    @meta.property()
    userId: number

    @meta.property()
    name: string

    @meta.property()
    role: "ShopOwner" | "ShopStaff"
}
