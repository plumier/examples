import { GenericController } from "@plumier/typeorm"
import { Shop } from "../shops/shops-entity"


export class ShopProductController extends GenericController([Shop, "products"], c => {
    c.mutators().authorize("ShopOwner", "ShopStaff")
}) { }