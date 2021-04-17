import { MongooseFacility } from "@plumier/mongoose"
import Plumier, { WebApiFacility } from "plumier"


new Plumier()
    .set(new WebApiFacility())
    .set(new MongooseFacility({ uri: "mongodb://localhost:27017/query-parser" }))
    .listen(8000)