import model, { collection } from "@plumier/mongoose"
import { genericController, meta } from "plumier"

@genericController()
@collection()
export class User {
    @collection.id()
    id:string

    @meta.property()
    email: string

    @meta.property()
    name: string

    @meta.property()
    deleted:boolean

    @meta.property()
    createdAt:Date
}
