import { ServeStaticFacility } from "@plumier/serve-static"
import dotenv from "dotenv"
import { join } from "path"
import Plumier, { bind, response, route, WebApiFacility, LoggerFacility } from "plumier"

dotenv.config()

export class AuthController {
    @route.get("/")
    index() {
        // use response.file to serve single file from action
        return response.file(join(__dirname, "./www/index.html"))
    }
}

new Plumier()
    .set(new WebApiFacility())
    .set(new LoggerFacility())
    // serve the static files (by default under www) directory
    .set(new ServeStaticFacility())
    .listen(8000)