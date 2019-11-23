const express = require('express')
const router = express.Router()
const controller = require('../controllers/contact')

router.post('/', controller.sendContactMail)

module.exports = router