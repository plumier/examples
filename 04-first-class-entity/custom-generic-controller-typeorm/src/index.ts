import { TypeORMFacility } from "@plumier/typeorm"
import Plumier, { WebApiFacility } from "plumier"
import { CustomControllerGeneric, CustomNestedControllerGeneric } from "./custom-generic-controller"



new Plumier()
    .set(new WebApiFacility())
    .set(new TypeORMFacility())
    .set({ genericController: [CustomControllerGeneric, CustomNestedControllerGeneric] })
    .listen(8000)