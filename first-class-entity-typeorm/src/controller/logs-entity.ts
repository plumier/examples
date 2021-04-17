import { entity, genericController } from "plumier"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./users-entity"

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @genericController()
    @ManyToOne(x => User)
    user: User

    @entity.deleteColumn()
    @Column()
    deleted: boolean

    @CreateDateColumn()
    createdAt: Date
}

