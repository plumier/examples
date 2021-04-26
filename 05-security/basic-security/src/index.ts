import { JwtAuthFacility } from "@plumier/jwt"
import Plumier, { WebApiFacility } from "plumier"
import dotenv from "dotenv"

dotenv.config()

new Plumier()
    .set(new WebApiFacility())
    .set(new JwtAuthFacility())
    .listen(8000)