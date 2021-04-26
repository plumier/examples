import { CustomGenericController } from "../custom-generic-controller";
import { User } from "../entity/users-entity";

// example usage of custom generic controller factory,
// we used user entity but set different route to avoid conflict
export class PersonController extends CustomGenericController(User, c => c.setPath("persons/:id")) { }