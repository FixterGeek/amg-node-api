const {sendContactMail} = require('../helpers/mailer')
const {checkForRobots} = require('../helpers/recaptcha')
const controller = {}

controller.sendContactMail = async (req, res) => {
  console.log(req.body)
  const address = req.connection.remoteAddress
  const captcha = req.body['captchaResponse']
  if(captcha === undefined || captcha === '' || captcha === null) {
    return res.status(400).json({"message" : "Please select captcha"});
  }
  const rescaptcha = await checkForRobots(address, captcha)
  if(!rescaptcha.success) return res.status(400).json({"message" : "Failed captcha verification"});
  sendContactMail(req.body)
    .then(r=>res.status('200').json(r))
    .catch(e=>res.status('400').json(e))
}

module.exports = controller