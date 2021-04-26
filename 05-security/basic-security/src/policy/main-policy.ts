import { authPolicy } from "@plumier/core";

/**
 * Here we define "name" for the authorization logic
 * next we use those names to secure action to restrict access to some user
 * using @authorize.route() decorator
 * 
 * Important to note that, when user attach bearer JWT token on request, the user claim is accessible 
 * via ctx.user 
 */

authPolicy()
    // Admin policy is when user claim role is Admin
    .register("Admin", ctx => ctx.user?.role === "Admin")
    .register("SuperAdmin", ctx => ctx.user?.role === "SuperAdmin")
    .register("User", ctx => ctx.user?.role === "User")