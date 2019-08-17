const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventActivities");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Eventos*/
router.get('/',verifyToken,tryCatch(controller.getActivityEvents))

/* Post all Eventos*/
router.post('/',verifyToken,upload('eventActivities').any(),tryCatch(controller.postActivityEvent))

/* assist  an event*/
router.post('/:id/assist',verifyToken,tryCatch(controller.assistActivityEvent))

/* unassist an event*/
router.delete('/:id/unassist',verifyToken,tryCatch(controller.unassistActivityEvent))

/*Get a single Eventos*/
router.get('/:id',verifyToken,tryCatch(controller.getActivityEvent))

/*Update a Eventos*/
router.patch('/:id',verifyToken,tryCatch(controller.updateActivityEvent))

/*Delete a Eventos*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteActivityEvent))


module.exports = router;