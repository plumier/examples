import { sign } from "jsonwebtoken"
import { authorize, HttpStatusError, JwtClaims, route } from "plumier"

declare module "plumier" {
    interface JwtClaims {
        userId: number,
        role: "Admin" | "SuperAdmin" | "User"
    }
}

export class AuthController {
    @authorize.route("Public")
    @route.post()
    login(username: string, password: string) {
        if (username !== "demo" || password !== "Dem*lisH")
            throw new HttpStatusError(402, "Invalid username or password")
        const token = sign(<JwtClaims>{ userId: 1234, role: "User" }, process.env.PLUM_JWT_SECRET!)
        return { token }
    }
}