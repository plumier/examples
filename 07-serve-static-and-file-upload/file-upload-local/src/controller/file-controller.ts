import { FormFile, route, val } from "plumier"
import { join } from "path"

export class FileController {

    /**
     * 
     */
    @route.post()
    async upload(@val.file("3MB") file: FormFile) {
        // copy the uploaded file from temp directory into files directory
        await file.copy(join(__dirname, "../files"))
    }


}