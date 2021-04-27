import { SwaggerFacility } from "@plumier/swagger"
import { TypeORMFacility } from "@plumier/typeorm"
import Plumier, { WebApiFacility } from "plumier"

new Plumier()
    .set(new WebApiFacility())
    .set(new TypeORMFacility())
    .set(new SwaggerFacility({
        // add project information (optional)
        info: {
            title: "My Cool Project",
            version: "1.0.0",
            description: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
        }
    }))
    .listen(8000)