# Plumier Example

This monorepo contains comprehensive list of Plumier examples. Its intended to be used to learn Plumier quickly by example. 

>Most of examples on this repository created using [Plumier project starter](https://github.com/plumier/starters).

### Project Layout and Entry Point

* [file-layout-single-file](/file-layout-single-file) put your code in single file, good for simple project.
  
* [file-layout-classic](/file-layout-classic) put your code in classic MVC style directory, this setup good for medium and big project. 

* [file-layout-modular](/file-layout-modular) put your code in separate directories, this setup good for medium and big project. 

### Controller

* [routing](routing) contains example on most routing trick, including how to create a restful controller and nested restful controller.

* [parameter-binding](parameter-binding) Parameter binding is process to bind request part (query, body, header) into action parameter. This directory contains example on how to bind request to parameter.

* [validation](validation) contains example on how to validate user input, how to validate parameters and model.
  
* [type-conversion](type-conversion) contains example on how to setup action and parameter to make the type conversion work properly. 

* [query-parser-mongoose](query-parser-mongoose) contains example on how to use Query Parser helper to parse request query string into Mongoose Query.

* [query-parser-typeorm](query-parser-typeorm) contains example on how to use Query Parser helper to parse request query string into Mongoose Query.

### Generic Controller and First Class Entity

* [first-class-entity-mongoose](first-class-entity-mongoose) contains example on how to use first class entity with Mongoose.
    
* [first-class-entity-typeorm](first-class-entity-typeorm) contains example on how to use first class entity with TypeORM.
  
* [generic-controller-typeorm](generic-controller-typeorm) contains example on how to create CRUD restful API by extending generic controller instead of using first class entity.
  
* [custom-generic-controller-typeorm](custom-generic-controller-typeorm) contains example on how to use first class entity with custom generic controller.
  
### Data Access
  
* [data-access-mongoose](data-access-mongoose) contains example on how to use Mongoose helper to access MongoDB database.

* [data-access-typeorm](data-access-typeorm) contains example on how to use TypeORM helper to access SQL database.

### Security

* [authentication-and-authorization](authentication-and-authorization) contains example on how to create authentication with JWT and how to authorize your user using policy based authorization. 
  
* [entity-policy](entity-policy) contains example on how to secure first class entity using entity policy.

* [social-login](social-login) contains example on how to use OAuth from several providers such as Facebook, Google, Twitter, GitHub, GitLab.

### Swagger 

* [swagger](swagger) contains example on how to enable the swagger facility.

### Server Static Files and File Upload

* [serve-static](serve-static) contains example on how to server static files from specific directory, or serve a file using route.

* [file-upload-local](file-upload-local) contains example on how to create file upload handler with local storage.

* [file-upload-s3](file-upload-s3) contains example on how to create file upload handler with Amazon S3 storage.


* [file-upload-google](file-upload-google) contains example on how to create file upload handler with Google Storage Bucket.

### Complete Example 

* [marketplace-api](marketplace-api) example how to create market place API using first class entity and generic controller, with complex authorization.

