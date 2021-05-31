import { GenericController } from "@plumier/typeorm"
import { User } from "../../api/users/users-entity"

export class UserController extends GenericController(User, c => {
    c.methods("Delete", "GetMany", "GetOne", "Patch", "Put").authorize("Admin")
    c.post().ignore()
}){}