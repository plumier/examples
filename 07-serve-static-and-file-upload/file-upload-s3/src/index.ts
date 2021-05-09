import Plumier, { WebApiFacility } from "plumier"


new Plumier()
    // enable the multipart form 
    .set(new WebApiFacility({ bodyParser: { multipart: true } }))
    .listen(8000)