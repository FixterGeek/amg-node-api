const express = require("express");
const router = express.Router();
const controller = require("../controllers/filiales");
//middlewares
const { verifyToken, checkIfAdmin } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Filialos*/
router.get('/',verifyToken,tryCatch(controller.getFiliales))

/* Post all Filialos*/
router.post('/',verifyToken, checkIfAdmin,,tryCatch(controller.postFilial))

/*Get a single Filialo*/
router.get('/:id',verifyToken,tryCatch(controller.getFilial))

/*Update a Filialos*/
router.patch('/:id',verifyToken,tryCatch(controller.updateFilial))

/*Delete a Filialos*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteFilial))


module.exports = router;