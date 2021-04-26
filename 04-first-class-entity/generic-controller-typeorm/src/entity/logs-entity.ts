import { entity, genericController } from "plumier"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./users-entity"

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @ManyToOne(x => User)
    user: User
}

