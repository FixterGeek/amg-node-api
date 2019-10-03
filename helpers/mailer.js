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

const accountCreated = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/welcome.hbs"), "utf8")
);
const userInRevision = hbs.compile(
	fs.readFileSync((__dirname, "./views/mails/revision.hbs"), "utf8")
);


// recovery
exports.recoveryMail = (email, token) => {
	transport.sendMail({
		subject: "Recuperación de contraseña",
		bcc: email,
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

//exports.paid

//exports.paymentReference

//exports.validating
exports.validatingProfile = (user) => {
	transport
		.sendMail({
			subject: "¡Tu perfil está en revisión!",
			bcc: user.email,
			html: userInRevision(user)
		})
		.then(r => console.log(r))
		.catch(e => console.log(e));
};

exports.contactMail = (from, name, subject) => {
	transport.sendMail({
		subject: `Contacto - ${subject}`,
		bcc: 'jo123.garcia.s@gmail.com',
		html: `
			<h2>Información de contacto</h2>
			<div><strong>Nombre: </strong> ${name}</div>
			<div><strong>Email: </strong> ${from}</div>
			<div><strong>Asunto: </strong> ${subject}</div>
		`
	})
		.then(response => console.log(response))
		.catch(error => console.log(error));
}


