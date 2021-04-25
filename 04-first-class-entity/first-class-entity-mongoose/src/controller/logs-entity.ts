import { collection } from "@plumier/mongoose"
import { genericController } from "plumier"

import { User } from "./users-entity"

@genericController()
@collection()
export class Log {
    @collection.id()
    id:string
    
    @collection.property()
    message: string

    // create generic controller from many-to-one 
    // it will generated into /users/:pid/logs
    @genericController()
    @collection.ref(x => User)
    user:User
}
