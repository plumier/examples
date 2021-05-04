import { noop } from "@plumier/reflect"
import { genericController, val } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { Shop } from "../shops/shops-entity"
import { User } from "../users/users-entity"


@Entity()
export class ShopUser extends EntityBase {

    @val.required()
    @ManyToOne(x => User)
    user: User

    @genericController(c => {
        c.setPath("shops/:pid/users/:id")
        c.mutators().authorize("ShopOwner")
        c.accessors().authorize("ShopOwner", "ShopStaff")
            .transformer(ShopUserDto, (x:ShopUser) => ({ userId: x.user.id, name: x.user.name, role: x.role }))
    })
    @ManyToOne(x => Shop)
    shop:Shop

    @Column({ default: "ShopStaff" })
    role: "ShopOwner" | "ShopStaff"
}

export class ShopUserDto {
    @noop()
    userId:number

    @noop()
    name:string

    @noop()
    role: "ShopOwner" | "ShopStaff"
}