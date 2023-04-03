# ToDo API
This is a TODO API built using Express. The API allows users to register, login, manage projects and tasks

## Getting started
To get started, clone this repository to your local machine, navigate to it and run the following command to install the dependencies:

```
$ npm install
```

Next, create a .env file in the root of the project and set the following environment variables:
* PORT="port_for_the_server" 
* MONGO_CONNECTION_STRING="your_mongo_connection_string"
* JWT_SECRET="your_jwt_secret"

Run application, type following command: 

```
$ npm run dev
```

Now the server is running on port you defined.

You can visit API documentation on route "/api-docs/"

To access authorized routes, you must include a Bearer Token in the request in the form - Bearer <accesstoken>.