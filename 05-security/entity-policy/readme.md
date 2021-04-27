# Entity Policy

This example show how to secure a first class entity using entity policy, the project derived from [first-class-entity-typeorm](../../03-first-class-entity/first-class-entity-typeorm).


In this example we will secure our User and Email entity, 
the rule are: 

* User entity
  * Everyone (Public) can register as user
  * Only the owner of the data can modify/delete
  * Only the owner of the data can see the `dob` property
  * Everyone (Authenticated User) can see list of users
  * Everyone can see user by ID
* Email entity
  * Mostly email only can be access/modify/deleted by the owner of the data


