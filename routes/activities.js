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
router.post('/',verifyToken,tryCatch(controller.postActivitiy))

/*Get a single activities*/
router.get('/:id',verifyToken,tryCatch(controller.getActivitiy))

/*Update a activities*/
router.patch('/:id',verifyToken,tryCatch(controller.updateActivitiy))

/*Delete a activities*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteActivitiy))


module.exports = router;