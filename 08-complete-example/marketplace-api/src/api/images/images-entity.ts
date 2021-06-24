import { authorize, val } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"
import { User } from "../users/users-entity"


@Entity()
export class Image extends EntityBase {

    @val.required()
    @Column()
    name: string

    @authorize.readonly()
    @Column()
    mimeType: string

    @authorize.readonly()
    @Column()
    size: number

    @authorize.readonly()
    @ManyToOne(x => User)
    owner: User

    @authorize.readonly()
    @Column()
    url: string
}
