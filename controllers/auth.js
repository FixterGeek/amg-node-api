const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");
const { welcomeMail, recoveryMail } = require("../helpers/mailer");
const controller = {};
const passport = require("passport");
let jwt = require('jsonwebtoken')

/*Get the logged user*/
controller.self = async (req, res) => {
	let { user } = req
	return res.status(200).send(user)
}

/*Post to login and return user and token*/
controller.login = async (req, res, next) => {
	passport.authenticate('local', (err, user, infoErr) => {
		if (err) return res.status(500).json({ err, infoErr })
		if (!user) return res.status(401).json(infoErr)
		req.logIn(user, err => {
			if (err) return res.status(500).json(err)
			let token = generateToken(req.user);
			return res.status(200).send({ user: req.user, token });
		})
	})(req, res, next)
};

/*Post to register a new user, email and pass needed*/
controller.signup = async (req, res) => {
	let exists = await User.findOne({ email: req.body.email });
	if (exists)
		return res.status(400).json({ message: "Este email ya existe en el sistema" });
	if (req.file || req.files) {
		let basics = { ...req.body.basicData, photoURL: req.file.secure_url }
		req.body['basicData'] = basics
	}
	req.body.username = req.body.email
	let user = await User.register(req.body, req.body.password);
	welcomeMail(user)
	let token = generateToken(user);
	return res.status(201).send({ user, token });
};

controller.changePass = async (req, res) => {
	let user = await User.findOne({ email: req.body.email })
	if (user) {
		console.log(user)
		user.changePassword(req.body.oldPassword, req.body.newPassword)
			.then(() => {
				user.save()
				return res.status(200).json(user)
			}).catch((e) => {
				return res.status(400).json(e)
			})
	} else {
		return res.status(404).json({ message: 'Este usuario no existe' })
	}
}

controller.forgotPass = async (req, res) => {
	let user = await User.findOne({ email: req.body.email })
	console.log("showUser"), user
	if (user) {
		console.log(user)
		// ENVIAR MAIL CON TOKEN
		let token = jwt.sign({
			email: user.email
		}, "bliss")
		await User.findByIdAndUpdate(user._id, { recoveryToken: true }, { new: true })
		recoveryMail(user.email, token)
		res.json({ token })
		// user.setPassword(req.body.password)
		// 	.then(() => {
		// 		user.save()
		// 		return res.status(200).json(user)
		// 	}).catch((e) => {
		// 		return res.status(400).json(e)
		// 	})
	} else {
		return res.status(404).json({ message: 'Este usuario no existe' })
	}
}

controller.recovery = async (req, res) => {
	let { token } = req.query
	if (!token) return res.send("Token invalido")
	let decode = jwt.verify(token, "bliss")
	let user = await User.findOne({ email: decode.email })
	if (user.recoveryToken) {
		User.findOneAndUpdate({ email: decode.email }, { recoveryToken: false }, { new: true })
		return res.render('recovery', { email: decode.email })
	}
	res.send("El token expiró")

}

controller.recoveryPost = async (req, res) => {
	let { password, email } = req.body
	let user = await User.findOne({ email: email })
	await user.setPassword(password);
	await user.save()
	res.send("Pasword actualizado con éxito")
}

module.exports = controller;