import { GenericController } from "@plumier/typeorm"

import { ShippingAddress } from "../shipping-addresses/shipping-addresses-entity"

export class UsersShippingAddressesController extends GenericController([ShippingAddress, "user"], c => {
    c.setPath("users/:pid/shipping-addresses/:id")
    c.all().authorize("ResourceOwner")
}){}