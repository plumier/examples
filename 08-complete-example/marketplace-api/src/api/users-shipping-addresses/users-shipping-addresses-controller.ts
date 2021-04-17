import { GenericController } from "@plumier/typeorm"

import { ShippingAddress } from "./users-shipping-addresses-entity"

export class UserShippingController extends GenericController([ShippingAddress, "user"], c => {
    c.setPath("users/:pid/shipping-addresses/:id")
    c.all().authorize("ResourceOwner")
}) { }