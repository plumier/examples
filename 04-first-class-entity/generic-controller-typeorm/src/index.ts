import { TypeORMFacility } from "@plumier/typeorm"
import Plumier, { WebApiFacility } from "plumier"

new Plumier()
    .set(new WebApiFacility())
    .set(new TypeORMFacility())
    .listen(8000)