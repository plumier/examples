import { GenericController } from "@plumier/typeorm"

import { Shop } from "../shops/shops-entity"
import { ShopUser, ShopUserDto } from "./shops-users-entity"

export class ShopUserController extends GenericController([Shop, "users"], c => {
    c.mutators().authorize("ShopOwner")
    c.accessors().authorize("ShopOwner", "ShopStaff")
        .transformer(ShopUserDto, (x:ShopUser) => ({ userId: x.user.id, name: x.user.name, role: x.role }))
}) { }