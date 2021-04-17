import { GenericController } from "@plumier/typeorm"

import { ShopUser } from "../shops-users/shops-users-entity"
import { UserShopDto } from "./users-shops-dto"

const transformer = (x:ShopUser) => (<UserShopDto>{ shopId: x.shop.id, name: x.shop.name, role: x.role })

export class ShopUserController extends GenericController([ShopUser, "user"], c => {
    c.setPath("users/:pid/shops/:id")
    c.getMany().authorize("ResourceOwner").transformer(UserShopDto, transformer)
    c.mutators().ignore()
}) { }