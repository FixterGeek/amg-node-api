const express = require("express");
const router = express.Router();
const controller = require("../controllers/modules");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all modules*/
router.get('/',verifyToken,tryCatch(controller.getModules))

/* Post all modules*/
router.post('/',verifyToken,upload('modules').any(),tryCatch(controller.postModule))

/*Get a single modules*/
router.get('/:id',verifyToken,tryCatch(controller.getModule))

/*Update a modules*/
router.patch('/:id',verifyToken,tryCatch(controller.updateModule))

/*Delete a modules*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteModule))


module.exports = router;