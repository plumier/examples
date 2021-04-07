import Plumier, { route, WebApiFacility } from "plumier";

// controller
// keep in mind all controllers need to be exported
export class UsersController {
    @route.get()
    get() {
        return {}
    }
}

// entry point application
new Plumier()
    .set(new WebApiFacility())
    .listen(8000)