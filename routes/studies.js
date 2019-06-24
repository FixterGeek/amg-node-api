const express = require("express");
const router = express.Router();
const controller = require("../controllers/studies");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Estudios*/
router.get('/',verifyToken,tryCatch(controller.getEstudios))

/* Post all Estudios*/
router.post('/',verifyToken,tryCatch(controller.postEstudio))

/*Get a single Estudios*/
router.get('/:id',verifyToken,tryCatch(controller.getEstudio))

/*Update a Estudios*/
router.patch('/:id',verifyToken,tryCatch(controller.updateEstudio))

/*Delete a Estudios*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteEstudio))


module.exports = router;