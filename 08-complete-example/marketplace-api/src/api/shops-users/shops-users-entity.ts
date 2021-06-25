import { noop } from "@plumier/reflect"
import { api, authorize, ControllerBuilder, genericController, val } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { Shop } from "../shops/shops-entity"
import { User } from "../users/users-entity"


@Entity()
export class ShopUser extends EntityBase {

    @val.required()
    @ManyToOne(x => User)
    user: User

    
    @authorize.readonly()
    @ManyToOne(x => Shop)
    shop:Shop

    @val.enums(["ShopOwner", "ShopStaff"])
    @Column({ default: "ShopStaff" })
    role: "ShopOwner" | "ShopStaff"
}

