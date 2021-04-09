import { route } from "@plumier/core";


/**
 * Root Route
 * 
 * Used to rename controller name
 * 
 * Generated into:
 * GET /root/one/index
 */
@route.root("root/one")
export class RootOneController {
    @route.get()
    index() {
        return {}
    }
}

/**
 * Root Route With Paramter
 * 
 * Accept route parameter (start with :), backing parameter must be specified on all actions
 * 
 * Generated into:
 * GET /root/:id/one
 * GET /root/:id/two/:tid
 */
@route.root("root/:id")
export class RootTwoController {
    @route.get()
    one(id: string) {
        return {}
    }

    @route.get("two/:tid")
    two(id: string, tid: string) {
        return {}
    }
}

/**
 * Multiple root
 * 
 * Multiple root can be specified and all actions generated accordingly based on each root
 * 
 * Generated into:
 * GET /api/v1/root/:id/one
 * GET /api/v1/root/:id/two/:tid
 * GET /api/v2/root/:id/one
 * GET /api/v2/root/:id/two/:tid
 */
@route.root("/api/v1/root/:id")
@route.root("/api/v2/root/:id")
export class RootThreeController {
    @route.get()
    one(id: string) {
        return {}
    }

    @route.get("two/:tid")
    two(id: string, tid: string) {
        return {}
    }
}