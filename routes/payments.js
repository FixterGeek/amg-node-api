const express = require("express");
const router = express.Router();
const controller = require("../controllers/payments");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
router.get('/',verifyToken,tryCatch(controller.getPayments))
router.post('/event', verifyToken, tryCatch(controller.eventPayment))
router.post('/subscription', verifyToken, tryCatch(controller.subscription))

module.exports = router