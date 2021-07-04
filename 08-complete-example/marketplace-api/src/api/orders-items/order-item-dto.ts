import { meta } from "plumier"

export class OrderItemDto {
    @meta.property()
    id:number

    @meta.property()
    productId:number

    @meta.property()
    productName:string 

    @meta.property()
    productPrice:number 

    @meta.property()
    quantity:number 

    @meta.property()
    subTotal:number
}