import model, { collection } from "@plumier/mongoose"
import { genericController, meta } from "plumier"

@collection()
export class Log {
    @collection.id()
    id:string
    
    @meta.property()
    name: string

    @meta.property()
    deleted:boolean

    @meta.property()
    createdAt:Date
}
