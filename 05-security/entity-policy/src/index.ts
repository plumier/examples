import { JwtAuthFacility } from "@plumier/jwt"
import Plumier, { WebApiFacility } from "plumier"
import { TypeORMFacility } from "@plumier/typeorm"
import dotenv from "dotenv"

dotenv.config()

new Plumier()
    .set(new WebApiFacility())
    .set(new JwtAuthFacility())
    .set(new TypeORMFacility())
    .listen(8000)