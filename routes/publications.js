const express = require("express");
const router = express.Router();
const controller = require("../controllers/publications");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Publications*/
router.get('/',verifyToken,tryCatch(controller.getPublications))

/* Post all Publications*/
router.post('/',verifyToken,upload('publications').any(),tryCatch(controller.postPublication))

/* Like/ dislike a post*/
router.post('/:id/like',verifyToken,tryCatch(controller.likePublication))

/*Get a single Publications*/
router.get('/:id',verifyToken,tryCatch(controller.getPublication))

/*Update a Publications*/
router.patch('/:id',verifyToken,tryCatch(controller.updatePublication))

/*Delete a Publications*/
router.delete('/:id',verifyToken,tryCatch(controller.deletePublication))


module.exports = router;