const express = require('express')
const router = express.Router()
const controller = require('../controllers/contact')

const tryCatch = (fn) => {
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}

router.post('/', tryCatch(controller.sendContactMail))

module.exports = router