import { api, meta, route, val } from "@plumier/core"


export class Log {
    @meta.property()
    id: number

    @meta.property()
    message: string

    @meta.property()
    date: Date

    /**
     * Define enum to get dropdown input on swagger ui
     */
    @val.enums(["Deleted", "Inactive"])
    status: "Active" | "Inactive"
}


export class LogsController {

    /**
     * Description can be applied on action and parameters
     */
    @api.description("Save log to the database")
    @route.post("")
    save(data: Log) {
        return { success: true }
    }

    /**
     * Define the return type of method to get proper response schema. 
     * (Only required when return type is generic type or array)
     * 
     * Enum also can be applied directly on parameter which will be the query string
     */
    @meta.type(Log)
    @route.get(":id")
    async get(id:number, @val.enums(["Deleted", "Inactive"]) state:"Active" | "Inactive"):Promise<Log> {
        return <Log>{}
    }
}