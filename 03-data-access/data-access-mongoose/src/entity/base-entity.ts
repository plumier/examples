import { collection } from "@plumier/mongoose";

// you can define an entity base class to bring common properties
export class EntityBase {
    @collection.id()
    id:string

    // property decorator receives mongoose schema type configuration
    @collection.property({ default: false })
    deleted: boolean

    @collection.property()
    createdAt: Date
}