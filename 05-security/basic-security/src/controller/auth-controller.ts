import { sign } from "jsonwebtoken"
import { authorize, HttpStatusError, JwtClaims, route } from "plumier"

/**
 * JwtClaims is the data structure of user claims of JWT token used in ctx.user
 * Augment the JwtClaims, adding properties required, so those properties accessible on ctx.user 
 */
declare module "plumier" {
    interface JwtClaims {
        userId: number,
        role: "Admin" | "SuperAdmin" | "User"
    }
}


export class AuthController {
    // Public is builtin auth policy to make route accessible by unauthenticated user
    @authorize.route("Public")
    @route.post()
    login(username: string, password: string) {
        if (username !== "demo" || password !== "Dem*lisH")
            throw new HttpStatusError(402, "Invalid username or password")
        // if login pass, sign the user claims match with the JwtClaims structure 
        // API consumer then should use this token for each request as Bearer
        const token = sign(<JwtClaims>{ userId: 1234, role: "User" }, process.env.PLUM_JWT_SECRET!)
        return { token }
    }
}