import Plumier, { route, WebApiFacility } from "plumier";


/**
 * Single file layout
 * 
 * Intended to be used to create a simple API, where all framework components (controller, entry point, etc) 
 * put in single file. 
 */

// controller
export class UsersController {
    @route.get()
    get() {
        return {}
    }
}

// entry point application
new Plumier()
    // keep in mind when using __filename all controllers need to be exported
    .set(new WebApiFacility({ controller: __filename }))
    .listen(8000)