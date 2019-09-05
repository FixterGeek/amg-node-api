const express = require("express");
const router = express.Router();
const controller = require("../controllers/residences");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Residencees*/
router.get('/',verifyToken,tryCatch(controller.getResidences))

/* Post all Residencees*/
router.post('/',verifyToken,upload('residencies').any(),tryCatch(controller.postResidence))

/*Get a single Residencees*/
router.get('/:id',verifyToken,upload('residencies').any(),tryCatch(controller.getResidence))

/*Update a Residencees*/
router.patch('/:id',verifyToken,tryCatch(controller.updateResidence))

/*Delete a Residencees*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteResidence))


module.exports = router;