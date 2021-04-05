import { SwaggerFacility } from "@plumier/swagger"
import { TypeORMFacility } from "@plumier/typeorm"
import Plumier, { authorize, genericController, WebApiFacility } from "plumier"
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export class EntityBase {
    @authorize.readonly()
    @PrimaryGeneratedColumn()
    id: number

    @authorize.readonly()
    @CreateDateColumn()
    createdAt: Date

    @authorize.readonly()
    @UpdateDateColumn()
    updatedAt: Date
}

@genericController()
@Entity()
export class Category extends EntityBase {
    @Column()
    name: string

    @genericController()
    @OneToMany(x => Item, x => x.category)
    items: Item[]
}

@Entity()
export class Item extends EntityBase {
    @Column()
    name: string

    @Column()
    price: number

    @ManyToOne(x => Category, x => x.items)
    category: Category
}

new Plumier()
    .set(new WebApiFacility({ controller: __filename }))
    .set(new TypeORMFacility())
    .set(new SwaggerFacility())
    .listen(8000)