const { usersLogin } = require('../data');
const { key, userAdmin, password } = require('../config/config');
const jwt = require('jsonwebtoken');

function getAllUsers(req, res) {
	return res.status(202).json({ ok: true, data: usersLogin });
}

function createUser(req, res) {
	usersLogin.push(req.body);
	return res.status(201).json({ ok: true, data: req.body, message: 'Visitante inscrito' });
}

function jwtGeneration(req, res) {
	const userData = { userAdmin, password };
	const token = jwt.sign(userData, key, { expiresIn: 60 * 60 * 24 });

	return res.json({ ok: true, token: `Bearer ${token}` });
}

module.exports = { getAllUsers, createUser, jwtGeneration };
