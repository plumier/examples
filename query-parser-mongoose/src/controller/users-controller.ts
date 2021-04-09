import model, { collection } from "@plumier/mongoose"
import { filterParser, meta, orderParser, route, selectParser, SelectQuery } from "plumier"

@collection()
export class User {
    @meta.property()
    email: string

    @meta.property()
    name: string

    @meta.property()
    deleted:boolean

    @meta.property()
    createdAt:Date
}

export class UsersController {
    /**
     * Query Parser https://plumierjs.com/query-parser
     * 
     * Parse user query string for select, filter and order into mongoose query. 
     * 
     * Valid query: 
     * /users?select=email,name&filter=(deleted=false and name='john'*)&order=-createdAt
     */
    @route.get("")
    list(@selectParser(x => User) select:SelectQuery, @filterParser(x => User) filter:any, @orderParser(x => User) order:any){
        const UserModel = model(User)
        return UserModel.find(filter, select.columns)
            .populate(select.relations)
            .sort(order)
    }
}