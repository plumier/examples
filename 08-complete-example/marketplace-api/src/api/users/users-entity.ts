import { noop } from "@plumier/reflect"
import { api, authorize, genericController, preSave, val } from "plumier"
import { Column, Entity, OneToMany } from "typeorm"
import bcrypt from "bcryptjs"

import { EntityBase } from "../../_shared/entity-base"
import { Order } from "../orders/order-entity"
import { ShippingAddress } from "../shipping-addresses/shipping-addresses-entity"
import { ShopUser } from "../shops-users/shops-users-entity"

// /api/users
@genericController(c => {
    c.post().authorize("Public")
    c.methods("Delete", "GetOne", "Patch", "Put").authorize("ResourceOwner")
    c.getMany().authorize("Admin")
})
@api.tag("Users Management")
@Entity()
export class User extends EntityBase {
    @authorize.read("ResourceOwner", "Admin")
    @val.required()
    @val.unique()
    @val.email()
    @Column()
    email: string

    @authorize.writeonly()
    @val.required()
    @Column()
    password: string

    @val.required()
    @Column()
    name: string

    @authorize.write("Admin")
    @authorize.read("ResourceOwner", "Admin")
    @Column({ default: "User" })
    role: "User" | "Admin"

    // /api/users/{pid}/shops
    @genericController(c => {
        c.setPath("users/:pid/shops/:id")
        c.getMany().authorize("ResourceOwner")
            .transformer(UserShopDto, transformer)
        c.mutators().ignore()
    })
    @authorize.none()
    @api.tag("User Shop Management")
    @OneToMany(x => ShopUser, x => x.user)
    shops: ShopUser[]

    // /api/users/{pid}/shipping-addresses
    @genericController(c => {
        c.setPath("users/:pid/shipping-addresses/:id")
        c.all().authorize("ResourceOwner")
    })
    @api.tag("User Shipping Address Management")
    @authorize.none()
    @OneToMany(x => ShippingAddress, x => x.user)
    address: ShippingAddress[]

    // /api/users/{pid}/orders
    @genericController(c => {
        c.mutators().ignore()
        c.accessors().authorize("ResourceOwner")
    })
    @api.tag("User Order Management")
    @authorize.none()
    @OneToMany(x => Order, x => x.user)
    orders: Order[]

    @preSave()
    async hashPassword() {
        if (this.password)
            this.password = await bcrypt.hash(this.password, await bcrypt.genSalt())
    }
}

const transformer = (x: ShopUser) => (<UserShopDto>{
    shopId: x.shop.id,
    name: x.shop.name,
    role: x.role
})

export class UserShopDto {
    @noop()
    shopId: number

    @noop()
    name: string

    @noop()
    role: "ShopOwner" | "ShopStaff"
}