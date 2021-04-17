import { Entity, Column, PrimaryGeneratedColumn, getRepository } from "typeorm"
import { filterParser, meta, orderParser, route, selectParser, SelectQuery } from "plumier"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    deleted: boolean

    @Column()
    createdAt: Date
}

export class UsersController {
    /**
     * Query Parser https://plumierjs.com/query-parser
     * 
     * Parse user query string for select, filter and order into mongoose query. 
     * 
     * Valid query: 
     * /users?select=email,name&filter=(deleted=false and name='john'*)&order=-createdAt
     */
    @route.get("")
    list(@selectParser(x => User) select: SelectQuery, @filterParser(x => User) filter: any, @orderParser(x => User) order: any) {
        const repo = getRepository(User)
        return repo.find({ where: filter, select: select.columns, relations: select.relations, order })
    }
}