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
// const accountCreated = hbs.compile(
// 	fs.readFileSync((__dirname, "./views/mails/welcome.hbs"), "utf8")
// );
const userInRevision = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/revision.hbs"), "utf8")
);
const userApproved = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/aceptado.hbs"), "utf8")
);
const userRejected = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/rechazado.hbs"), "utf8")
);
const paymentSuccess = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/pago.hbs"), "utf8")
);
const suscriptionWelcome = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/bienvenido.hbs"), "utf8")
);
const recoverPasswordSuccess = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/resetpassword.hbs"), "utf8")
);
const recoverPassword = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/reqresetpassword.hbs"), "utf8")
);
const assistEvent = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/evento.hbs"), "utf8")
);


// recovery
exports.recoveryMail = (user, token) => {
	transport.sendMail({
		subject: "Recuperación de contraseña",
		bcc: user.email,
		html: recoverPassword(user, token),		
	})
}

exports.recoveryMailSuccess = (user) => {
	transport.sendMail({
		subject: "Recuperación de contraseña exitosa",
		bcc: user.email,
		html: recoverPasswordSuccess(user)
	})
}


exports.assistenceToEvent = ({ email, basicData }, event) => {
	transport
		.sendMail({
			subject: "¡Bienvenido a AMG",
			bcc: email,
			html: assistEvent({ basicData, email, event })
		})
		.then(r => r)
		.catch(e => e);
};

//exports.validating
exports.validatingProfile = (user) => {
	return	transport
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
	return	transport
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
	return	transport
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
exports.paymentReference = (user, payment) => {
	transport
		.sendMail({
			subject: "¡Tu pago está listo!",
			bcc: user.email,
			html: paymentSuccess({user, payment})
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
			subject: "¡Bienvenido a AMG!",
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
	}

	exports.sendContactMail = ({nombre, mail, asunto}) => {
		return transport
			.sendMail({
				subject: 'Has recibido un mensaje',
				bcc: `hola@gastrointerologia.mx`,
				html: `
					<h1>¡Tienes un nuevo mensaje!</h1>

					<p>Nombre: ${nombre}</p>
					<p>Correo: ${mail}</p>
					<p>Asunto: ${asunto}</p>

				`
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

