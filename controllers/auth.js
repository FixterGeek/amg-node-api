const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");
const { welcomeMail } = require("../helpers/mailer");
const controller = {};

/*Get the logged user*/
controller.self = async (req,res) => {
	let {user} = req
	return res.status(200).send(user)
}

/*Post to login and return user and token*/
controller.login = async (req, res) => {
	//console.log(req.user);
	let token = generateToken(req.user);
	res.status(200).send({ user: req.user, token });
};

/*Post to register a new user, email and pass needed*/
controller.signup = async (req, res) => {
	let exists = await User.findOne({ email: req.body.email });
	if (exists)
		return res
			.status(401)
			.json({ message: "Este email ya existe en el sistema" });
	let user = await User.register(req.body, req.body.password);	
	welcomeMail(user);
	let token = generateToken(user);
	res.send({ user, token });
};

module.exports = controller;