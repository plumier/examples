import { entity, genericController } from "plumier"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"

import { Email } from "./emails-entity"

@genericController()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // create generic controller from one-to-many relation
    // it will generated into /users/:pid/emails
    // Plumier understand that the user property of Email entity should be filled with :pid parameter
    @genericController()
    @OneToMany(x => Email, x => x.user)
    emails: Email

    // mark property as delete column, 
    // DELETE /users/:id will not delete the record permanently
    @entity.deleteColumn()
    @Column({ default: false })
    deleted: boolean
}
