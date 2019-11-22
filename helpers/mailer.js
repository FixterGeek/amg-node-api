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

exports.paymentReference = (user, order) => {
	transport
		.sendMail({
			subject: "Aquí tienes tu orden",
			bcc: user.email,
			html: 'Tu pago es:'
		})
		.then(r => console.log(r))
		.catch(e => console.log(e));
};

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


