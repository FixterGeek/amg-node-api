const express = require("express");
const router = express.Router();
const controller = require("../controllers/studies");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Estudios*/
router.get('/',verifyToken,tryCatch(controller.getStudies))

/* Post all Estudios*/
router.post('/',verifyToken,upload('studies').any(),tryCatch(controller.postStudy))

/*Get a single Estudios*/
router.get('/:id',verifyToken,tryCatch(controller.getStudy))

/*Update a Studys*/
router.patch('/:id',verifyToken,upload('studies').any(),tryCatch(controller.updateStudy))

/*Delete a Studys*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteStudy))


module.exports = router;