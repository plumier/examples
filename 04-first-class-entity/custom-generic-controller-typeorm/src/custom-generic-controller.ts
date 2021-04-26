import { createGenericControllerTypeORM, TypeORMControllerGeneric, TypeORMNestedControllerGeneric } from "@plumier/typeorm";
import { generic, type } from "@plumier/reflect"
import { meta } from "@plumier/core";
import { SelectQuery } from "plumier";
import { Context } from "koa"


@generic.parameter("T")
export class PaginatedResponse<T> {
    @type(["T"])
    result: T[]

    @meta.property()
    offset: number

    @meta.property()
    limit: number

    @meta.property()
    total: number
}

export class CustomControllerGeneric<T, TID> extends TypeORMControllerGeneric<T, TID> {
    @type(PaginatedResponse, "T")
    async list(offset: number | undefined, limit: number | undefined, filter: any, select: SelectQuery, order: string, ctx: Context): Promise<any> {
        const result = await super.list(offset, limit, filter, select, order, ctx)
        return <PaginatedResponse<T>>{
            result, offset, limit, total: await this.repo.count(filter ?? {})
        }
    }
}

export class CustomNestedControllerGeneric<P, T, PID, TID> extends TypeORMNestedControllerGeneric<P, T, PID, TID>{
    @type(PaginatedResponse, "T")
    async list(pid: PID, offset: number | undefined, limit: number | undefined, filter: any, select: SelectQuery, order: string, ctx: Context): Promise<any> {
        const result = await super.list(pid, offset, limit, filter, select, order, ctx)
        return <PaginatedResponse<T>>{
            result, offset, limit, total: await this.repo.count(filter ?? {})
        }
    }
}


/**
 * Since we used custom generic controller, we can't use GenericController() factory anymore, 
 * because it uses the default generic controllers.
 * Instead, we create a new generic controller factory.
 */
export const CustomGenericController = createGenericControllerTypeORM([CustomControllerGeneric, CustomNestedControllerGeneric])