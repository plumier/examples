import { GenericController } from "@plumier/typeorm"

import { Log } from "../entity/logs-entity"

// create generic controller using many-to-one relation 
// it will serve /users/:pid/logs
export class UsersLogsController extends GenericController([Log, "user"]){}