const express = require("express");
const router = express.Router();
const controller = require("../controllers/activities");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all activities*/
router.get('/',verifyToken,tryCatch(controller.getActivities))

/* Post all activities*/
router.post('/',verifyToken,tryCatch(controller.postActivity))

/*Get a single activities*/
router.get('/:id',verifyToken,tryCatch(controller.getActivity))

/*Update a activities*/
router.patch('/:id',verifyToken,tryCatch(controller.updateActivity))

/*Delete a activities*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteActivity))


module.exports = router;