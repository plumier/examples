import { route, val } from "plumier"


export class User {
    /**
     * Apply validator on property to validate its value
     */
    @val.email()
    @val.required()
    email: string

    @val.length({ min: 5, max: 128 })
    name: string
}

export class UsersController {

    @route.post("")
    save(data: User) {
        return {}
    }

    /**
     * Its also possible to validate action parameter
     */
    @route.get(":id")
    get(@val.required() id: string) {
        return {}
    }
}