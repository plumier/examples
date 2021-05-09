import { FormFile, meta, route, val } from "plumier"
import { join } from "path"
import sdk from "aws-sdk"
import { readFile } from "fs"
import { promisify } from "util"

const readFileAsync = promisify(readFile)

const s3 = new sdk.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
});

export class FileController {


    /**
     * Create upload handler POST /file/upload 
     * receive multipart form with <input type="file" name="file"/>
     * which maximum uploaded file is 3MB
     */
    @route.post()
    async upload(@val.file("3MB") file: FormFile) {
        // copy the uploaded file from temp directory into files directory
        const buf = await readFileAsync(file.path)
        const result = await s3.upload({
            Bucket: <string>process.env.AWS_BUCKET_NAME,
            Body: buf,
            Key: file.name,
            ACL: "public-read",
        }).promise()
        return { url: result.Location }
    }

    /**
     * Create upload handler for multiple file upload POST /file/multiple 
     * receive multipart form with <input type="file" name="file" multiple/>
     * which maximum of each uploaded file is 3MB
     */
    @route.post()
    async multiple(@val.file("3MB") @meta.type([FormFile]) file: FormFile[]) {
        // copy the uploaded files from temp directory into files directory
        const result = []
        for (const f of file) {
            const buf = await readFileAsync(f.path)
            const res = await s3.upload({
                Bucket: <string>process.env.AWS_BUCKET_NAME,
                Body: buf,
                Key: f.name,
                ACL: "public-read",
            }).promise()
            result.push({ url: res.Location })
        }
        return result
    }
}