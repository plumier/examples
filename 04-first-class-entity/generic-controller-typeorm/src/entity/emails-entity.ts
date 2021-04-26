import { entity, genericController } from "plumier"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
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

