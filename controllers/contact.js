const {sendContactMail} = require('../helpers/mailer')
const controller = {}

controller.sendContactMail = (req, res) => {
  sendContactMail(req.body)
    .then(r=>res.status('200').json(r))
    .catch(e=>res.status('400').json(e))
}

module.exports = controller