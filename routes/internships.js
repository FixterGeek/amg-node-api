const express = require("express");
const router = express.Router();
const controller = require("../controllers/internships");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Internships*/
router.get('/',verifyToken,tryCatch(controller.getInternships))

/* Post all Internships*/
router.post('/',verifyToken,tryCatch(controller.postInternship))

/*Get a single Internships*/
router.get('/:id',verifyToken,tryCatch(controller.getInternship))

/*Update a Internships*/
router.patch('/:id',verifyToken,tryCatch(controller.updateInternship))

/*Delete a Internships*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteInternship))


module.exports = router;