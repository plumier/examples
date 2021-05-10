import { type } from "@plumier/reflect"
import { authorize, bind, entityProvider, FormFile, JwtClaims, route, val } from "plumier"
import { getRepository } from "typeorm"

import { Shop } from "../shops/shops-entity"
import { Image } from "./image-entity"

@route.root("shops/:pid/images")
export class ShopsImagesController  {
    @route.post()
    @type({ id: Number })
    @entityProvider(Shop, "pid")
    @authorize.route("ShopOwner", "ShopStaff")
    async upload(@val.required() pid: number, @val.required() @val.image("1MB") file: FormFile, @bind.user() user: JwtClaims) {

        // usually we push file to cloud storage such as Amazon S3 or Google Storage Bucket
        // Amazon S3 https://stackoverflow.com/a/52369452/212706
        // Google Storage Bucket https://stackoverflow.com/a/57799209/212706
        const imageRepo = getRepository(Image)
        const image = await imageRepo.save({
            shop: { id: pid },
            name: file.name,
            mimeType: file.type,
            size: file.size,
            createdBy: { id: user.userId },
            url: "https://image.com/image.jpg"
        })
        return { id: image.id }
    }
}