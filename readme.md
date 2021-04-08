# Plumier Example

This monorepo contains comprehensive list of Plumier examples. Its intended to be used to learn Plumier quickly by example. 

Most of examples on this repository created using [Plumier project starter](https://github.com/plumier/starters).

## File Layout 
This examples showing how you can layout your code, wether you can choose to separate your code per module or just put it in single file. 

* [Single File Style](/01-file-layout-single-file) put your code in single file, good for simple project.

* [Modular Style](/02-file-layout-modular) put your code in separate directories, this setup good for medium and big project.

## Routing 
Routing is process to send request with a specific url into the appropriate handler in this case the controller's action. 

* [Routing example](03-routing) contains example on most routing trick, including how to create a restful controller and nested restful controller.

## Parameter Binding 
Parameter binding is process to bind request part (query, body, header) into action parameter. 

* [Parameter Binding](04-parameter-binding) contains example on how to bind request to parameter.

## Validation and Type Conversion 
Validation is the process to validate user input using several decorators. Type conversion is the process to convert the user input into proper data type match with action parameter data type. 

* [Validation and Type Conversion](05-validation-and-type-conversion) contains example on how to validate user info and how to setup action and parameter to make the type conversion work properly. 

## Data Access 
Plumier has some helper to integrate ORM/ODM function to access data base (SQL database or MongoDB database) from your code. 

* [Data Access Mongoose](#) contains example on how to use Mongoose helper to access MongoDB database.

* [Data Access TypeORM](#) contains example on how to use TypeORM helper to access SQL database.

## Query Parser 
Query parser is the process to parse request query (select, filter and order query) into TypeORM or Mongoose query.

* [Query Parser Mongoose](#) contains example on how to use query parser specific to Mongoose ODM.

* [Query Parser TypeORM](#) contains example on how to use query parser specific to TypeORM.

## Security 
Plumier has some security feature to secure your API from unauthenticated or authorized user. 

* [Security](#) contains example on how to create authentication with JWT and how to authorize your user using policy based authorization. 

## First Class Entity 
First class entity is an ORM entity which has more control to the framework components. First class entity enables you to create secure CRUD API instantly using reusable generic controller. 

* [First Class Entity Mongoose](#) contains example on how to use first class entity with Mongoose.
* [First Class Entity TypeORM](#) contains example on how to use first class entity with TypeORM.

## Social Login 
Plumier has some helper to be use to secure your API using OAuth 1.X and OAuth 2.0.

* [Social Login](#) contains example on how to use OAuth from several providers such as Facebook, Google, Twitter, GitHub, GitLab.

## Swagger 
Swagger is a User Interface used to explore and test your Rest API. Plumier automatically generate Open API 3.0 specification from controller metadata to be able for Swagger to inspect your API. 

* [Swagger](#) contains example on how to use enable the swagger facility.

## Server Static 
Plumier has facility to serve static files (images, stylesheet, html).

* [Server Static](#) contains example on how to server static files from specific directory, or serve a file using route.

## File Upload 
Plumier has facility for file upload using multipart form and also has several validation function to validate file size & mime.

* [File Upload Local](#) contains example on how to create file upload handler with local storage.
* [File Upload S3](#) contains example on how to create file upload handler with Amazon S3 storage.
* [File Upload Google Bucket](#) contains example on how to create file upload handler with Google Storage Bucket.


