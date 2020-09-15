const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

const { usersController, middlewareController } = require('./controllers');

server.use(cors());
server.use(bodyParser.json());
server.use(middlewareController.dataValidator);
server.use(middlewareController.emailValidator);

/* Routs */
server.post('/eventech/visitors', middlewareController.repeatedUser, usersController.createUser);
server.post('/eventech/login', middlewareController.adminValidator, usersController.jwtGeneration);
server.get('/eventech/secure/all-visitors', middlewareController.jwtValidation, usersController.getAllUsers);

server.use(middlewareController.generalError);

/* Server */
server.listen(3000, () => {
	console.log('Workshop server is on...');
});
