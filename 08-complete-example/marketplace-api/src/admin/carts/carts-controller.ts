import { GenericController } from "@plumier/typeorm";
import { Cart } from "../../api/carts/carts-entity";


export class CartsController extends GenericController(Cart, c => {
    c.methods("Delete", "GetMany", "GetOne", "Patch", "Put").authorize("Admin")
    c.post().ignore()
}){}