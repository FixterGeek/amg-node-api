const express = require("express");
const router = express.Router();
const controller = require("../controllers/recursos");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all recursos*/
router.get('/',tryCatch(controller.getRecursos))

/* Post all recursos*/
router.post('/',verifyToken,upload('recursos').any(),tryCatch(controller.postRecurso))

/* Like/ dislike a post*/
router.post('/:id/like',verifyToken,tryCatch(controller.likeRecurso))

/*Get a single recursos*/
router.get('/:id',verifyToken,tryCatch(controller.getRecurso))

/*Update a recursos*/
router.patch('/:id',verifyToken,tryCatch(controller.updateRecurso))

/*Delete a recursos*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteRecurso))


module.exports = router;