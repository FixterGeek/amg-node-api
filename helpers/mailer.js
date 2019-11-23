let nodemailer = require("nodemailer");
let hbs = require("hbs");
let fs = require("fs");

let transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS
	}
});

//load templates
const accountCreated = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/welcome.hbs"), "utf8")
);
const userInRevision = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/revision.hbs"), "utf8")
);
const userApproved = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/welcome.hbs"), "utf8")
);
const userRejected = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/welcome.hbs"), "utf8")
);
const paymentSuccess = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/welcome.hbs"), "utf8")
);
const suscriptionWelcome = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/welcome.hbs"), "utf8")
);
const recoverPassword = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/welcome.hbs"), "utf8")
);


// recovery
exports.recoveryMail = (email, token) => {
	transport.sendMail({
		subject: "Recuperación de contraseña",
		bcc: email,
		html: recoverPassword(user),
		html: `
		<h2>Crea una nueva contraseña aqui:</h2>
		<a href="http://amg-api.herokuapp.com/auth/recovery?token=${token}"> Click aquí  </a>
		`
	})
}


exports.welcomeMail = ({ email, basicData }, password) => {
	transport
		.sendMail({
			subject: "¡Bienvenido a AMG",
			bcc: email,
			html: accountCreated({ basicData, email, password })
		})
		.then(r => r)
		.catch(e => e);
};

//exports.validating
exports.validatingProfile = (user) => {
	transport
		.sendMail({
			subject: "¡Tu perfil está en revisión!",
			bcc: user.email,
			html: userInRevision(user)
		})
		.then(r => {
			console.log(r)
			return r
		})
		.catch(e => {
			console.log(e)
			throw e
		});
};

//user is approved
exports.userIsApproved = (user) => {
	transport
		.sendMail({
			subject: "¡Felicidades!",
			bcc: user.email,
			html: userApproved(user)
		})
		.then(r => {
			console.log(r)
			return r
		})
		.catch(e => {
			console.log(e)
			throw e
		});
};

//user is rejected
exports.userIsRejected = (user) => {
	transport
		.sendMail({
			subject: "¡Lo sentimos!",
			bcc: user.email,
			html: userRejected(user)
		})
		.then(r => {
			console.log(r)
			return r
		})
		.catch(e => {
			console.log(e)
			throw e
		});
};

//exports.paid
exports.paymentReference = (user, element) => {
	transport
		.sendMail({
			subject: "¡Tu pago está listo!",
			bcc: user.email,
			html: paymentSuccess({user, element})
		})
		.then(r => {
			console.log(r)
			return r
		})
		.catch(e => {
			console.log(e)
			throw e
		});
};

exports.suscriptionAndWelcome = (user) => {
	transport
		.sendMail({
			subject: "¡Tu pago está listo!",
			bcc: user.email,
			html: suscriptionWelcome(user)
		})
		.then(r => {
			console.log(r)
			return r
		})
		.catch(e => {
			console.log(e)
			throw e
		});
};

