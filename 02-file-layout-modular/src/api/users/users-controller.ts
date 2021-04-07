import { route } from "plumier"

import { User } from "./users-entity"

export class UsersController {

    // POST   /users
    @route.post("")
    save(data: User) {
        return {}
    }

    // GET   /users
    @route.get("")
    list(limit: number, offset: number) {
        return {}
    }

    // GET   /users/:id
    @route.get(":id")
    get(id: string) {
        return {}
    }

    // PUT   /users/:id
    @route.put(":id")
    replace(id: string) {
        return {}
    }

    // PATCH   /users/:id
    @route.patch(":id")
    modify(id: string) {
        return {}
    }

    // DELETE   /users/:id
    @route.delete(":id")
    delete(id: string) {
        return {}
    }
}