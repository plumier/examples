import { JwtAuthFacility } from "@plumier/jwt"
import { SwaggerFacility } from "@plumier/swagger"
import { TypeORMFacility } from "@plumier/typeorm"
import Plumier, { Configuration, ControllerFacility, LoggerFacility, WebApiFacility } from "plumier"


function createApp(config?: Partial<Configuration>) {
    return new Plumier()
        .set({ ...config, rootDir: __dirname })
        .set(new WebApiFacility({ bodyParser: { multipart: true } }))
        .set(new ControllerFacility({
            controller: "./api/**/*+(controller|entity).+(js|ts)",
            rootPath: "/api"
        }))
        .set(new ControllerFacility({
            controller: "./admin/**/*+(controller|entity).+(js|ts)",
            rootPath: "/api/admin", group: "admin"
        }))
        .set(new TypeORMFacility())
        .set(new JwtAuthFacility({ globalAuthorize: "AnyUser", }))
        .set(new SwaggerFacility())
        .set(new LoggerFacility())
        .initialize()
}

export default createApp