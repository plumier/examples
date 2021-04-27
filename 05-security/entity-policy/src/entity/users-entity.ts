import { authorize, entity, genericController } from "plumier"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Email } from "./emails-entity"

@genericController(c => {
    // everyone can register
    c.post().authorize("Public")
    // only the owner can modify/delete the data
    c.methods("Put", "Patch", "Delete").authorize("Owner")
    // everyone can see list of user and user by ID
    c.accessors().authorize("Public")
})
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    /**
     * DOB only can be seen and set by the owner of the data.
     * We already restrict User entity only can be modify/delete by the owner
     * so the write protection on this property is not necessary
     * 
     * We also add access to SuperAdmin to get rid of the Query Parser warning
     */
    @authorize.read("Owner", "SuperAdmin")
    @Column()
    dob: Date

    /**
     * Authorize all routes /users/:pid/emails only accessible by Owner
     */
    @genericController(c => c.all().authorize("Owner"))
    @OneToMany(x => Email, x => x.user)
    emails: Email

    @entity.deleteColumn()
    @Column({ default: false })
    deleted: boolean
}

