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



exports.welcomeMail = ({ email, basicData }) => {	
	transport
		.sendMail({
			subject: "¡Bienvenido a AMG",
			bcc: email,
			html: accountCreated(basicData)
		})
		.then(r => console.log(r))
		.catch(e => console.log(e));
};

//exports.paid

//exports.pay

//exports.validating


