const express = require('express')
const router = express.Router()
const {welcomeMail} = require ('../helpers/mailer')

router.post('/', (req, res) => {

  welcomeMail(req.body)
    .then(r=>{
      console.log(r)
    }).catch(e=>console.log(e))
  
})