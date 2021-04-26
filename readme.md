# Plumier Example

This monorepo contains comprehensive list of Plumier examples. Its intended to be used to learn Plumier quickly by example. 

>Most of examples on this repository created using [Plumier project starter](https://github.com/plumier/starters).

### Project Layout and Entry Point

* [file-layout-single-file](01-project-layout/file-layout-single-file) put your code in single file, good for simple project.
  
* [file-layout-classic](01-project-layout/file-layout-classic) put your code in classic MVC style directory, this setup good for medium and big project. 

* [file-layout-modular](01-project-layout/file-layout-modular) put your code in separate directories, this setup good for medium and big project. 

### Controller

* [routing](02-controller/routing) contains example on most routing trick, including how to create a restful controller and nested restful controller.

* [parameter-binding](02-controller/parameter-binding) Parameter binding is process to bind request part (query, body, header) into action parameter. This directory contains example on how to bind request to parameter.

* [validation](02-controller/validation) contains example on how to validate user input, how to validate parameters and model.
  
* [type-conversion](02-controller/type-conversion) contains example on how to setup action and parameter to make the type conversion work properly. 

* [query-parser-mongoose](02-controller/query-parser-mongoose) contains example on how to use Query Parser helper to parse request query string into Mongoose Query.

* [query-parser-typeorm](02-controller/query-parser-typeorm) contains example on how to use Query Parser helper to parse request query string into Mongoose Query.

### Data Access
  
* [data-access-mongoose](04-data-access/data-access-mongoose) contains example on how to use Mongoose helper to access MongoDB database.

* [data-access-typeorm](04-data-access/data-access-typeorm) contains example on how to use TypeORM helper to access SQL database.

### First Class Entity and Generic Controller

* [first-class-entity-mongoose](03-first-class-entity/first-class-entity-mongoose) contains example on how to use first class entity with Mongoose.
    
* [first-class-entity-typeorm](03-first-class-entity/first-class-entity-typeorm) contains example on how to use first class entity with TypeORM.
  
* [generic-controller-typeorm](03-first-class-entity/generic-controller-typeorm) contains example on how to create CRUD restful API by extending generic controller instead of using first class entity.
  
* [custom-generic-controller-typeorm](03-first-class-entity/custom-generic-controller-typeorm) contains example on how to use first class entity with custom generic controller.
  
### Security

* [basic-security](05-security/basic-security) contains example on how to create authentication with JWT and how to authorize your user using policy based authorization. 
  
* [entity-policy](05-security/entity-policy) contains example on how to secure first class entity using entity policy.

* [social-login](05-security/social-login) contains example on how to use OAuth from several providers such as Facebook, Google, Twitter, GitHub, GitLab.

### Swagger 

* [swagger](06-swagger/swagger) contains example on how to enable the swagger facility.

### Server Static Files and File Upload

* [serve-static](07-serve-static-and-file-upload/serve-static) contains example on how to server static files from specific directory, or serve a file using route.

* [file-upload-local](07-serve-static-and-file-upload/file-upload-local) contains example on how to create file upload handler with local storage.

* [file-upload-s3](07-serve-static-and-file-upload/file-upload-s3) contains example on how to create file upload handler with Amazon S3 storage.


* [file-upload-google](07-serve-static-and-file-upload/file-upload-google) contains example on how to create file upload handler with Google Storage Bucket.

### Complete Example 

* [marketplace-api](08-complete-example/marketplace-api) example how to create market place API using first class entity and generic controller, with complex authorization.

