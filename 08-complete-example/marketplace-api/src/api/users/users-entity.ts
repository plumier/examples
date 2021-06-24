import bcrypt from "bcryptjs"
import { authorize, ControllerBuilder, genericController, preSave, val } from "plumier"
import { Column, Entity } from "typeorm"

import { EntityBase } from "../../_shared/entity-base"

const config = (c:ControllerBuilder) => {
    c.post().authorize("Public")
    c.methods("Delete", "GetOne", "Patch", "Put").authorize("ResourceOwner")
    c.getMany().ignore()
}

@genericController(config)
@Entity()
export class User extends EntityBase {
    @authorize.read("ResourceOwner", "Admin")
    @val.required()
    @val.unique()
    @val.email()
    @Column()
    email: string

    @authorize.writeonly()
    @val.required()
    @Column()
    password: string

    @val.required()
    @Column()
    name:string

    @authorize.write("Admin")
    @authorize.read("ResourceOwner", "Admin")
    @Column({ default: "User" })
    role: "User" | "Admin"

    @preSave()
    async hashPassword() {
        if (this.password)
            this.password = await bcrypt.hash(this.password, await bcrypt.genSalt())
    }
}