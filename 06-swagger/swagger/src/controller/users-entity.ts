import { entity, genericController } from "plumier"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"


/**
 * First class entity has its own generic controller 
 * which will provide the metadata for OAS3,
 * Mostly no further configuration needed
 */

@genericController()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @entity.deleteColumn()
    @Column({ default: false })
    deleted: boolean
}
