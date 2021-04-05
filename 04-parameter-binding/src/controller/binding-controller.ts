
import { bind, JwtClaims, route } from "plumier";
import { noop } from "@plumier/reflect"
import { Context } from "koa"

/**
 * Example model 
 * each property required to be decorated 
 * to make reflection library able to get its data type
 */
class Body {
    @noop()
    string: string
    @noop()
    number: number
    @noop()
    date: Date
    @noop()
    boolean: boolean
}

export class BindingsController {

    /**
     * Name Binding 
     * bind request query into action parameters match its name
     * 
     * Example request:
     * GET /bindings/byname?page=1&limit=2&name=hello
     */
    @route.get()
    byName(page: number, limit: number, name: string) { 
        return {}
    }

    /**
     * Model Binding
     * bind request body with action parameter which has datatype of type custom class (model)
     * model binding usually used with http method POST, PUT, PATCH
     * 
     * Example request:
     * POST /bindings/bymodel 
     * body: { string: "lorem", number: 123, date: "2021-1-1", date: false }
     */
    @route.post()
    byModel(body: Body) { 
        return {}
    }


    /**
     * Decorator Binding
     * bind request part with action parameter
     * 
     * Example request 
     * GET /bindings/bydecorator 
     * Header: Authentication=Bearer <token>
     */
    @route.get()
    byDecorator(@bind.user() user: JwtClaims, @bind.ctx() ctx: Context) { 
        return {}
    }

    /**
     * Decorator Binding (with model)
     * Decorator binding can be bound with action parameter of data type custom class
     * 
     * Example request
     * GET /bindings/bydecoratormodel?string=lorem&number=123&boolean=false&date=2021-1-1
     */
    @route.get()
    byDecoratorModel(@bind.query() query:Body) { 
        return {}
    }

    /**
     * Mix Binding
     * Parameter binding can be mixed in single action
     * 
     * Example request
     * POST /bindings/bymix?string=lorem&number=123
     * Header: Authentication=Bearer <token>
     * body: { string: "lorem", number: 123, date: "2021-1-1", date: false }
     */
    @route.post()
    byMix(string:string, number:number, body:Body, @bind.user() user:JwtClaims){ 
        return {}
    }
}