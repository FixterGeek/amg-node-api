const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");
const { recoveryMailSuccess, recoveryMail } = require("../helpers/mailer");
const controller = {};
const passport = require("passport");
let jwt = require('jsonwebtoken')

/*Get the logged user*/
controller.self = async (req, res) => {
	let { user } = req
	user = await User.findById(user._id)
	.populate('teachingActivities')
	.populate('hospitalActivities')
	.populate('medicalSocieties')
	.populate('studies')
	.populate('internships')
	.populate('residences')
	.populate('assistedEvents')
	.populate('assistedActivities')
	.populate('renewals')
	.populate('eventOrders')
	.populate('courseOrders')
	.populate('following')
	.populate('followers')
	.populate('consultories')

	if(user.renewals && new Date() - user.renewals[user.renewals.length  -1].createdAt >= 31536000000){
		const updatedUser = {...user}
		updatedUser['membershipStatus'] = 'Free'
		user = await User.findByIdAndUpdate(req.params.id,{$set:updatedUser},{new:true})
	}
	return res.status(200).json(user)	
}

/*Post to login and return user and token*/
controller.login = async (req, res, next) => {
	passport.authenticate('local', (err, user, infoErr) => {
		if (err) return res.status(500).json({ err, infoErr })
		if (!user) return res.status(401).json(infoErr)
		req.logIn(user, err => {
			if (err) return res.status(500).json(err)
			let token = generateToken(req.user);
			delete user.hash
			return res.status(200).send({ user: req.user, token });
		})
	})(req, res, next)
};

/*Post to register a new user, email and pass needed*/
controller.signup = async (req, res) => {
	let exists = await User.findOne({ email: req.body.email });
	if (exists)
		return res.status(400).json({ message: "Este email ya existe en el sistema" });
		if(req.file||req.files){		
			req.files.forEach(element => {
				if(element.fieldname == 'photo'){
					let basics = {...req.body.basicData, photoURL:element.secure_url}	
					return req.body['basicData'] = basics
				}
				if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
				else req.body[`${element.fieldname}URLS`] = [element.secure_url]
			})
		}
	if(!req.body.username)req.body.username = req.body.email
	let user = await User.register(req.body, req.body.password);	
	let token = generateToken(user);
	delete user.hash
	return res.status(201).send({ user, token });
};

controller.changePass = async (req, res) => {
	let user = await User.findOne({ email: req.body.email })
	if (user) {		
		user.changePassword(req.body.oldPassword, req.body.newPassword)
			.then(() => {
				user.save()
				recoveryMailSuccess(user)
				return res.status(200).json(user)
			}).catch((e) => {
				return res.status(400).json(e)
			})
	} else {
		return res.status(404).json({ message: 'Este usuario no existe' })
	}
}

controller.forgotPass = async (req, res) => {
	let { email } = req.body
	email = email.toLowerCase()
	let user = await User.findOne({ email })
	if (user) {				
		let token = jwt.sign({
			email: user.email
		}, "bliss")
		await User.findByIdAndUpdate(user._id, { recoveryToken: true }, { new: true })
		// MAIL 
		recoveryMail(user, token)
		res.json({ token })
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