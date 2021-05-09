import { entityPolicy } from "plumier"

import { User } from "./users-entity"


entityPolicy(User)
    .register("ResourceOwner", (ctx, id) => ctx.user?.userId === id)