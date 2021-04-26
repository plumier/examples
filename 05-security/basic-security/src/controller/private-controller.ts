import { authorize, bind, route } from "@plumier/core";
import { JwtClaims } from "plumier";



export class PrivateController {

    /**
     * This route only accessible by Admin
     */
    @authorize.route("Admin")
    @route.get()
    admin() {
        return { message: "Welcome Admin" }
    }

    /**
     * This route only accessible by SuperAdmin
     */
    @authorize.route("SuperAdmin")
    @route.get()
    superAdmin() {
        return { message: "Welcome SuperAdmin" }
    }

    /**
    * This route only accessible by User
    */
    @authorize.route("User")
    @route.get()
    user() {
        return { message: "Welcome User" }
    }

    /**
    * This route only accessible by SuperAdmin and Admin
    */
     @authorize.route("SuperAdmin", "Admin")
     @route.get()
     allAdmins() {
         return { message: "Welcome Admins" }
     }

    /**
     * This route accessible by any user
     * we can get login user from controller using @bind.user()
     */
     @route.get()
     anyUser(@bind.user() user: JwtClaims) {
         return { message: `Welcome ${user.role}` }
     }
}