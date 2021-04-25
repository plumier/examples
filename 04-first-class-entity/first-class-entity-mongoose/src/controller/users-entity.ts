import model, { collection } from "@plumier/mongoose"
import { entity, genericController } from "plumier"

import { Email } from "./emails-entity"

// create generic controller 
// it will generated into /users
@genericController()
@collection()
export class User {
    @collection.id()
    id: string

    @collection.property()
    name: string

    // create generic controller from one-to-many relation
    // it will generated into /users/:pid/emails
    // note that the inverse property (user) need to specify, 
    // so Plumier understand that the user property of Email entity should be filled with :pid parameter
    @genericController()
    @collection.ref(x => [Email], "user")
    emails: Email[]

    // mark property as delete column, 
    // DELETE /users/:id will not delete the record permanently
    @entity.deleteColumn()
    @collection.property({ default: false })
    deleted: boolean
}
