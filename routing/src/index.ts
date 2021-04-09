import Plumier, { WebApiFacility } from "plumier"


new Plumier()
    .set(new WebApiFacility())
    .listen(8000)