import { entity, genericController } from "plumier"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./users-entity"

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    // create generic controller from many-to-one 
    // it will generated into /users/:pid/logs
    @genericController()
    @ManyToOne(x => User)
    user: User
}

