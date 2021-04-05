import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { User } from "../users/users-entity"
import { val } from "@plumier/validator"


@Entity()
export class ShippingAddress extends EntityBase {
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