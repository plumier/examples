import { noop } from "@plumier/reflect"
import { val } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { Shop } from "../shops/shops-entity"
import { User } from "../users/users-entity"


@Entity()
export class ShopUser extends EntityBase {

    @val.required()
    @ManyToOne(x => User)
    user: User

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