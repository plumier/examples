import { genericController } from "@plumier/generic-controller"
import { val } from "@plumier/validator"
import { authorize } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { User } from "../users/users-entity"


@genericController(c => {
    c.accessors().authorize("Admin")
    c.mutators().ignore()
})
@Entity()
export class ShippingAddress extends EntityBase {
    @authorize.readonly()
    @ManyToOne(x => User)
    user:User

    @val.required()
    @Column()
    address: string

    @val.required()
    @Column()
    city:string 

    @val.required()
    @Column()
    country: string

    @val.required()
    @Column()
    zipCode: string
}