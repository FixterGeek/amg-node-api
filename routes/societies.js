const express = require("express");
const router = express.Router();
const controller = require("../controllers/societies");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Societyes*/
router.get('/',verifyToken,tryCatch(controller.getSocieties))

/* Post all Societyes*/
router.post('/',verifyToken,tryCatch(controller.postSociety))

/*Get a single Societyes*/
router.get('/:id',verifyToken,tryCatch(controller.getSociety))

/*Update a Societyes*/
router.patch('/:id',verifyToken,tryCatch(controller.updateSociety))

/*Delete a Societyes*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteSociety))


module.exports = router;