import { collection } from "@plumier/mongoose"

import { User } from "./users-entity"

@collection()
export class Email {
    @collection.id()
    id: string

    @collection.property()
    email: string

    @collection.property()
    description: string

    @collection.property()
    primary: boolean

    @collection.ref(x => User)
    user: User
}
