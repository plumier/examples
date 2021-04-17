import { type } from "@plumier/reflect"
import { GenericController } from "@plumier/typeorm"
import { authorize, bind, entityProvider, FormFile, GenericControllerConfiguration, JwtClaims, route, val } from "plumier"
import { getRepository } from "typeorm"
import { Shop } from "../shops/shops-entity"

import { Image } from "./image-entity"

const config: GenericControllerConfiguration = c => {
    c.methods("Post").ignore()
    c.methods("GetOne", "GetMany", "Delete", "Put", "Patch").authorize("ShopOwner", "ShopStaff")
}
export class UsersImagesController extends GenericController([Image, "shop"], config) {
    @route.post()
    @type({ id: Number })
    @entityProvider(Shop, "pid")
    @authorize.route("ShopOwner", "ShopStaff")
    async upload(pid: number, @val.required() @val.image("1MB") file: FormFile, @bind.user() user: JwtClaims) {

        // usually we push file to cloud storage such as Amazon S3 or Google Storage Bucket
        // Amazon S3 https://stackoverflow.com/a/52369452/212706
        // Google Storage Bucket https://stackoverflow.com/a/57799209/212706

        await this.findParentByIdOrNotFound(pid)
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