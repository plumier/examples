import { entity, genericController } from "plumier"
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@genericController()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    name: string

    @entity.deleteColumn()
    @Column()
    deleted: boolean

    @CreateDateColumn()
    createdAt: Date
}
