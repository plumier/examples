import { collection } from "@plumier/mongoose"

import { EntityBase } from "./base-entity"

@collection()
export class User extends EntityBase {

    @collection.property()
    email: string

    @collection.property()
    name: string
}
