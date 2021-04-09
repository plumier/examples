
# Classic file layout
 
This layout usually used for a structured API, follows classic MVC style project, each framework component separated in directory: `controller`, `model`, `entity`, `repository`, `view` etc.

By default Plumier will use `./**/*controller.+(ts|js)` glob pattern to search for controller, 
it means all controllers should be put in file name ends with `controller` such as: 
`users-controller.ts` or `user_controller.ts`. 

