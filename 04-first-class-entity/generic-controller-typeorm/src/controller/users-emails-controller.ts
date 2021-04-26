import { GenericController } from "@plumier/typeorm"

import { User } from "../entity/users-entity"

// create generic controller using one-to-many relation
// it will serve /users/:pid/emails
export class UsersEmailsController extends GenericController([User, "emails"]){}
