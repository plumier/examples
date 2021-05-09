import { FormFile, meta, route, val } from "plumier"
import { join } from "path"

export class FileController {

    /**
     * Create upload handler POST /file/upload 
     * receive multipart form with <input type="file" name="file"/>
     * which maximum uploaded file is 3MB
     */
    @route.post()
    async upload(@val.file("3MB") file: FormFile) {
        // copy the uploaded file from temp directory into files directory
        return file.copy(join(__dirname, "../files"))
    }

    /**
     * Create upload handler for multiple file upload POST /file/multiple 
     * receive multipart form with <input type="file" name="file" multiple/>
     * which maximum of each uploaded file is 3MB
     */
    @route.post()
    async multiple(@val.file("3MB") @meta.type([FormFile]) file: FormFile[]) {
        // copy the uploaded files from temp directory into files directory
        return Promise.all(file.map(f => f.copy(join(__dirname, "../files"))))
    }
}