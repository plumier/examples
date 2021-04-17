import { entity } from "plumier"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { CustomGenericController } from "../custom-generic-controller"
import { User } from "./users-entity"

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

export class UserLogsController extends CustomGenericController([Log, "user"]) { }

