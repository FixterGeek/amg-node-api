const express = require("express");
const router = express.Router();
const controller = require("../controllers/institutions");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Institutiones*/
router.get('/',verifyToken,tryCatch(controller.getInstitutions))

/* Post all Institutiones*/
router.post('/',verifyToken,tryCatch(controller.postInstitution))

/*Get a single Institutiones*/
router.get('/:id',verifyToken,tryCatch(controller.getInstitution))

/*Update a Institutiones*/
router.patch('/:id',verifyToken,tryCatch(controller.updateInstitution))

/*Delete a Institutiones*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteInstitution))


module.exports = router;