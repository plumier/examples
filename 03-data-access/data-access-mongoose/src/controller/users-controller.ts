import { route } from "@plumier/core";
import model from "@plumier/mongoose";
import { User } from "../entity/users-entity";


export class UsersController {
    
    @route.post("")
    save(data:User) {
        // create mongoose model using model factory like below
        const UserModel = model(User)
        return new UserModel(data).save()
    }
}