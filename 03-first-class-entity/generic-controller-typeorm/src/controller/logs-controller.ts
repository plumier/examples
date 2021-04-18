import { GenericController } from "@plumier/typeorm"
import { entity, genericController } from "plumier"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./users-controller"

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(x => User)
    user: User

    @entity.deleteColumn()
    @Column()
    deleted: boolean

    @CreateDateColumn()
    createdAt: Date
}

export class UsersLogsController extends GenericController([Log, "user"]){}