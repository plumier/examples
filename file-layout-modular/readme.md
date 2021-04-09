
# Modular file layout
 
This layout usually used for a structured API, each framework component separated in each files

By default Plumier will use `./**/*controller.+(ts|js)` glob pattern to search for controller, 
it means all controllers should be put in file name ends with `controller` such as: 
`users-controller.ts` or `user_controller.ts`. 

