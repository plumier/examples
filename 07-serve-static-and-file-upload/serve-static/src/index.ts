import { ServeStaticFacility } from "@plumier/serve-static"
import { join } from "path"
import Plumier, { response, route, WebApiFacility } from "plumier"


export class HomeController {
    @route.get("/")
    index() {
        // use response.file to serve single file from action
        return response.file(join(__dirname, "./www/index.html"))
    }
}

new Plumier()
    .set(new WebApiFacility())
    // serve the static files (by default under www) directory
    .set(new ServeStaticFacility())
    .listen(8000)