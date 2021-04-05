import { noop } from "@plumier/reflect"


export class UserShopDto {
    @noop()
    shopId:number

    @noop()
    name:string

    @noop()
    role: "ShopOwner" | "ShopStaff"
}