import { genericController } from "@plumier/generic-controller"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { User } from "./users-entity"


@Entity()
export class Email {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    description:string

    @Column()
    primary:boolean

    @ManyToOne(x => User)
    user:User
}


