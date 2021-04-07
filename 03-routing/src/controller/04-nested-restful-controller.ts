import { meta, route } from "plumier"


/**
 * With combination of root route, we can make a nested restful routes 
 */

export class Log {
    @meta.property()
    message:string
}

@route.root("user/:uid/logs")
export class UsersLogsController {

    // POST   /users/:uid/logs
    @route.post("")
    save(uid:string, data:Log){
        return {}
    }

    // GET   /users/:uid/logs
    @route.get("")
    list(uid:string, limit:number, offset:number){
        return {}
    }

    // GET   /users/:uid/logs/:id
    @route.get(":id")
    get(uid:string, id:string){
        return {}
    }

    // PUT   /users/:uid/logs/:id
    @route.put(":id")
    replace(uid:string, id:string){
        return {}
    }

    // PATCH   /users/:uid/logs/:id
    @route.patch(":id")
    modify(uid:string, id:string){
        return {}
    }

    // DELETE   /users/:uid/logs/:id
    @route.delete(":id")
    delete(uid:string, id:string){
        return {}
    }
}