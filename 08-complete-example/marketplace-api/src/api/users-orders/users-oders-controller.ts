import { GenericController } from "@plumier/typeorm";
import { Order } from "../shops-orders/order-entity";

export class UsersOrdersController extends GenericController([Order, "user"], c => {
    c.methods("Delete", "Put", "Post").ignore()
    c.methods("Patch", "GetMany", "GetOne").authorize("ResourceOwner")
}){}