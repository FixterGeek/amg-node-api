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



exports.welcomeMail = ({ email, basicData },password) => {	
	transport
		.sendMail({
			subject: "¡Bienvenido a AMG",
			bcc: email,
			html: accountCreated({basicData,email,password})
		})
		.then(r => console.log(r))
		.catch(e => console.log(e));
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


