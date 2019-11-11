
# Node-CRUD restful
A simple restful NodeJS API, with expressJS and mongoDB.

## Resources

- Node.Js
- Express.Js
- MongoDb
- Mongoose
 - BodyParser
 - bcryptjs
 - cors
 - debug
 - jsonwebtoken
 - http
 - Morgan
- Postman


## Routes

|          ROUTE            |       HTTP        |      DESCRIPTION      | 
| ------------------------- | ----------------- | --------------------- | 
| /api/signup               |       POST        | Signup page           | 
| /api/signin               |       POST         | Signin page           | 
| /api/:user_id             |       GET         | Show user by id       | 


## Running

```
git clone https://github.com/veryjoh/desafio_backend.git
```
 go to directory and run, this will install all dependencies for the project.
```
npm install
```
Then run API with:
```
npm start
```

You can also run by building the docker image and running it
got to root directory and run the following command
```
docker build -t <any name> .
```
```
docker run -d -p 3000:3000 <the name you gave>
```
To stop the running docker container 

```
docker ps 
copy the container id then type on your terminal docker stop <container id>
```

## You can test the endpoints by using Postman 

#### Postman

* Install [Postman](https://www.getpostman.com/apps) to interact with REST API
* To create a user:
  * URL: localhost:3000/api/signup
  * Method: POST
  * Body: raw + JSON (application/json)
  
  * Body Content: 
  ``` json
	"nome":"test user",
	"email":"test@test.com",
	"senha": "teste",
	"telefones":[
		{
			"ddd": "11",
			"numero":"999900000"
		},
		{
			"ddd": "21",
			"numero":"999911111"
		}
	]

* To signin:
  * URL: localhost:3000/api/signin
  
  * Method: POST
  
  * Body: raw + JSON (application/json)
  
  * Body Content:
  ``` json
  {
	"email":"teste@teste.com",
	"senha": "teste"
	}
## Author

* **Johantan Souza** - [GitHub]([https://github.com/veryjoh]) - Email: jgs8115@gmail.com

OBS
```
https://chalenge4414.herokuapp.com/api/singup
```