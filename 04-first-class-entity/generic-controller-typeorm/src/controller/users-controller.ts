import { GenericController } from "@plumier/typeorm"

import { User } from "../entity/users-entity"

// create generic controller using entity
// it will serve /users
export class UsersController extends GenericController(User){}