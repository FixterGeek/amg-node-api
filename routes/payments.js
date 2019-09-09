const express = require("express");
const router = express.Router();
const controller = require("../controllers/payments");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
router.get('/',verifyToken,tryCatch(controller.getPayments))
router.post('/',upload('payments').single('recipet'),verifyToken,tryCatch(controller.postPayment))
// router.patch('/:id',upload('payments').single('recipet'),verifyToken,tryCatch(controller.updatePayment))
// router.delete('/:id',verifyToken,tryCatch(controller.deletePayment))
// router.get('/:id',verifyToken,tryCatch(controller.getPayment))
router.post('/event', verifyToken, tryCatch(controller.eventPayment))
router.post('/subscription', verifyToken, tryCatch(controller.subscription))


module.exports = router