const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataFacturacion");
//middlewares
const { verifyToken, checkIfAdmin } = require("../helpers/jwt");
const { upload } = require('../helpers/cloudinary')

const tryCatch = (fn) => {
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}

router.get("/",verifyToken, checkIfAdmin, tryCatch(controller.getDataFacturacion))

router.post("/",verifyToken, checkIfAdmin, upload('facts').any(), tryCatch(controller.postDataFacturacion))

router.patch("/", verifyToken, checkIfAdmin, upload('facts').any(), tryCatch(controller.updateDataFacturacion));


module.exports = router;