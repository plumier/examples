import { type } from "@plumier/reflect"
import { api, bind, FormFile, JwtClaims, route, val } from "plumier"
import { getRepository } from "typeorm"

import { Image } from "./images-entity"

@api.tag("Image Management")
@route.root("images")
export class ImagesController  {
    @route.post()
    @type({ id: Number })
    async upload(@val.required() @val.image("1MB") file: FormFile, @bind.user() user: JwtClaims) {
        // usually we push file to cloud storage such as Amazon S3 or Google Storage Bucket
        // example https://github.com/plumier/examples/tree/master/07-serve-static-and-file-upload/file-upload-s3
        const imageRepo = getRepository(Image)
        const image = await imageRepo.save({
            owner: { id: user.userId },
            name: file.name,
            mimeType: file.type,
            size: file.size,
            url: "https://image.com/image.jpg"
        })
        return { id: image.id }
    }
}