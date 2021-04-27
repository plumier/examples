import { ServeStaticFacility } from "@plumier/serve-static"
import {
    FacebookOAuthFacility,
    GitHubOAuthFacility,
    GitLabOAuthFacility,
    GoogleOAuthFacility,
    OAuthUser,
    redirectUri,
    TwitterOAuthFacility,
} from "@plumier/social-login"
import dotenv from "dotenv"
import { join } from "path"
import Plumier, { bind, response, route, WebApiFacility, LoggerFacility } from "plumier"

dotenv.config()

export class AuthController {
    @route.get("/")
    index() {
        return response.file(join(__dirname, "./www/index.html"))
    }

    /**
     * /auth/callback 
     * is the global redirect uri, used for all installed social login facility
     */
    @redirectUri()
    callback(@bind.oAuthUser() user: OAuthUser) {
        // send response back from popup window to main window with success message
        // and user information
        return response.postMessage({ status: "Success", user })
    }
}

new Plumier()
    .set(new WebApiFacility())
    .set(new LoggerFacility())
    // server the static files (by default under www) directory
    .set(new ServeStaticFacility())
    .set(new FacebookOAuthFacility())
    .set(new GoogleOAuthFacility())
    .set(new GitHubOAuthFacility())
    .set(new GitLabOAuthFacility())
    .set(new TwitterOAuthFacility())
    .listen(8000)