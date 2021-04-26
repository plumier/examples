import { route } from "@plumier/core";
import { User } from "../entity/users-entity";
import { getRepository } from "typeorm"


export class UsersController {

    @route.post("")
    save(data: User) {
        // create repository or query builder like usual
        const repo = getRepository(User)
        return repo.save(data)
    }
}