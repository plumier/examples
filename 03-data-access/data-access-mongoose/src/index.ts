import { MongooseFacility } from "@plumier/mongoose"
import Plumier, { WebApiFacility } from "plumier"


new Plumier()
    .set(new WebApiFacility())
    // install mongoose facility, 
    // specify the db uri, or use PLUM_MONGODB_URI env variable.
    .set(new MongooseFacility({ uri: "mongodb://localhost:27017/gc" }))
    .listen(8000)