import { authPolicy, entityPolicy } from "plumier";
import { Email } from "../entity/emails-entity";
import { User } from "../entity/users-entity";
import { getRepository } from "typeorm"
/**
 * Here is the global policy (application wide policy), 
 * This policy can be applied globally and also can be use to secure entities
 * 
 * This part already explained on `basic-security` example
 */
authPolicy()
    .register("Admin", ctx => ctx.user?.role === "Admin")
    .register("SuperAdmin", ctx => ctx.user?.role === "SuperAdmin")
    .register("User", ctx => ctx.user?.role === "User")

/**
 * Here we define policy to secure our entity using entity policy.
 * Entity policy is a custom auth policy which provide function to secure 
 * entity based on its ID. Entity policy can be applied on the generated routes, 
 * or on entity property to restrict access (read/write) to entity property.
 * Policy file can be place anywhere on the project, here in this example 
 * we put it on single place to easier to understand 
 */

/**
 * based on our rules defined on readme file.
 * 
 *   * User entity
 *      * Everyone (Public) can register as user
 *      * Only the owner of the data can modify/delete
 *      * Only the owner of the data can see the `dob` property
 *      * Everyone can see list of users
 *      * Everyone can see user by ID
 *    * Email entity
 *      * Mostly email only can be access/modify/deleted by the owner of the data
 * 
 * so here we need to define the logic of the Owner of User and Entity
 */

/**
 * First we define the owner of the data of User entity. 
 * Owner Definition: when the current login user match the entity ID
 */

entityPolicy(User)
    // the first parameter is ctx, we destruct only to get the current login user claims
    // the second parameter is the current ID of entity (User entity)
    .register("Owner", ({ user }, id) => user?.userId === id)

/**
 * Next we define the owner of the data of Email entity
 * Owner Definition: when the current login user match the Email.user.id 
 */

entityPolicy(Email)
    .register("Owner", async ({ user }, id) => {
        const repo = getRepository(Email)
        // get the email by ID and populate the user property 
        const email = await repo.findOne(id, { relations: ["user"] })
        // compare if the current login user id is the same with email user id
        return user?.userId === email?.user.id
    })