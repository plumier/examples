import { entity, genericController } from "plumier"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"

import { Email } from "./emails-entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(x => Email, x => x.user)
    emails: Email

    // mark property as delete column, 
    // DELETE /users/:id will not delete the record permanently
    @entity.deleteColumn()
    @Column({ default: false })
    deleted: boolean
}
