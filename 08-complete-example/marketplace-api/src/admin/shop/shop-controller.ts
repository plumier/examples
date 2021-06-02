import { GenericController } from "@plumier/typeorm";
import { Shop } from "../../api/shops/shops-entity";


export class ShopController extends GenericController(Shop, c => {
    c.methods("Delete", "GetMany", "GetOne", "Patch", "Put").authorize("Admin")
    c.post().ignore()
}){}