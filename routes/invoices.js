const express = require("express");
const router = express.Router();
const controller = require("../controllers/invoices");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}

/*Generate a CFDI */
router.post('/new/:paymentId',verifyToken,controller.postInvoice)
router.get('/',verifyToken,controller.getInvoices)

module.exports = router