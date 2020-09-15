const { usersLogin } = require('../data');
const { key, userAdmin, password } = require('../config/config');
const jwt = require('jsonwebtoken');

function repeatedUser(req, res, next) {
	let userRepeated = usersLogin.find((user) => user.email == req.body.email);
	if (userRepeated !== undefined) return res.status(409).json({ ok: false, message: 'Error, usuario ya registrado' });
	else return next();
}

function emailValidator(req, res, next) {
	const { email, password } = req.body;

	if (req.method == 'POST' && !password) {
		if (email.includes('hotmail.com') || email.includes('gmail.com') || email.includes('yahoo.com')) {
			return res.status(409).json({ ok: false, message: 'Error, ese tipo de email no esta permitido' });
		} else return next();
	} else return next();
}
/* validar que todo sea numerico pilas, faltan esas validaciones */
function dataValidator(req, res, next) {
	let { name, lastName, email, age } = req.body;

	if (req.method == 'POST' && !req.body.password) {
		if (name && lastName && email && age) return next();
		else return res.status(409).json({ ok: false, message: 'Error, faltan datos' });
	} else return next();
}

function adminValidator(req, res, next) {
	if (req.body.userAdmin === userAdmin && req.body.password == password) return next();
	else return res.status(409).json({ ok: false, message: 'Error, credenciales incorrectas' });
}

function jwtValidation(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const verifyToken = jwt.verify(token, key);

		if (verifyToken) {
			req.token = verifyToken;
			return next();
		}
	} catch (err) {
		return res.status(401).json({ ok: false, message: 'Token inválido' });
	}
}

function generalError(err, req, res, next) {
	if (!err) return next();
	else return res.status(500).json({ ok: false, message: 'server error' });
}

module.exports = { repeatedUser, adminValidator, generalError, emailValidator, dataValidator, jwtValidation };
