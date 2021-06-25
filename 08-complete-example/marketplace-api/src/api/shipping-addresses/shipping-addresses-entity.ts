import { val } from "@plumier/validator"
import { authorize, genericController } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { User } from "../users/users-entity"


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