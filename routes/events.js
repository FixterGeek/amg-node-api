const express = require("express");
const router = express.Router();
const controller = require("../controllers/events");
//middlewares
const { verifyToken, checkIfAdmin } = require("../helpers/jwt");
const {uploadAndResize, upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Eventos*/
router.get('/',verifyToken,tryCatch(controller.getEvents))

/* Post all Eventos*/
router.post('/',verifyToken, checkIfAdmin, uploadAndResize('events').any(),tryCatch(controller.postEvent))

/* assist an event*/
router.post('/:id/assist',verifyToken,tryCatch(controller.assistEvent))

/* unassist an event*/
router.delete('/:id/unassist',verifyToken,tryCatch(controller.unassistEvent))

/* add or remove a speaker*/
router.post('/:id/speaker',verifyToken,upload('speakers').any(),tryCatch(controller.addSpeaker))

/*Get a single Evento*/
router.get('/:id',verifyToken,tryCatch(controller.getEvent))

/*Update a Eventos*/
router.patch('/:id',verifyToken,uploadAndResize('events').any(),tryCatch(controller.updateEvent))

/*Delete a Eventos*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteEvent))


module.exports = router;