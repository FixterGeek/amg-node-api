const express = require("express");
const router = express.Router();
const controller = require('../controllers/contact');

const tryCatch = (fn) => {
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}

router.post('/recapcha', tryCatch(controller.recapcha));

module.exports = router;