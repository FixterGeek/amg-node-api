const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");
const { welcomeMail } = require("../helpers/mailer");
const controller = {};
const passport = require("passport");

/*Get the logged user*/
controller.self = async (req,res) => {
	let {user} = req
	return res.status(200).send(user)
}

/*Post to login and return user and token*/
controller.login = async (req, res, next) => {

	passport.authenticate('local', (err, user, infoErr) => {
    if (err) return res.status(500).json({ err, infoErr })
    if (!user) return res.status(401).json( infoErr)
    req.logIn(user, err => {
      if (err) return res.status(500).json(err)
      let token = generateToken(req.user);
			return res.status(200).send({ user: req.user, token });
    })
  })(req, res, next)
	// console.log(req)
	// let token = generateToken(req.user);
	// return res.status(200).send({ user: req.user, token });
};

/*Post to register a new user, email and pass needed*/
controller.signup = async (req, res) => {
	let exists = await User.findOne({ email: req.body.email });
	if (exists)
		return res.status(401).json({ message: "Este email ya existe en el sistema" });
	let user = await User.register(req.body, req.body.password);	
	welcomeMail(user);
	let token = generateToken(user);
	return res.status(201).send({ user, token });
};

module.exports = controller;