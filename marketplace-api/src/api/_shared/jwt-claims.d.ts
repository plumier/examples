import  "plumier"

declare module "plumier" {
    interface JwtClaims {
        userId: number,
        role: "User" | "Admin"
        refresh?: true
    }
}