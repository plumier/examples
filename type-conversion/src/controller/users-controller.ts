import { meta, route, val } from "plumier"


export class User {
    /**
     * Property need to have at least one decorator for type conversion to work
     * use @meta.property() for that
     */
    @meta.property()
    email: string

    @meta.property()
    name: string

    /**
     * Data type array need to specified explicitly
     */
    @meta.type(x => [String])
    emails: string[]
}

export class UsersController {

    /**
     * Request body will be checked match with User data type, 
     * if provided property value with different data type, 
     * will returned http status 422 with proper error message
     */
    @route.post("")
    save(data: User) {
        return {}
    }

    /**
     * query parameter receive input match with its data type 
     * Valid query
     * /users/get?num=123 
     * /users/get?str=lorem+ipsum
     * /users/get?bo=true (true, false, yes, no, 1, 0, on, off)
     * /users/get?dt=2021-1-1 or use ISO 8601
     */
    @route.get()
    get(num:number, str:string, bo:boolean, dt:Date){
        return {}
    }

}