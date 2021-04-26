import { TypeORMFacility } from "@plumier/typeorm"
import Plumier, { WebApiFacility } from "plumier"

new Plumier()
    .set(new WebApiFacility())
    // install TypeORMFacility, it normalize TypeORM entities 
    // to make Plumier reflection library able to introspect them.
    // put connection string on environment variable or .env file like .env-example file
    .set(new TypeORMFacility())
    .listen(8000)