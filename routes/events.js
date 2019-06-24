const express = require("express");
const router = express.Router();
const controller = require("../controllers/events");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Eventos*/
router.get('/',verifyToken,tryCatch(controller.getEvents))

/* Post all Eventos*/
router.post('/',verifyToken,tryCatch(controller.postEvent))

/*Get a single Eventos*/
router.get('/:id',verifyToken,tryCatch(controller.getEvent))

/*Update a Eventos*/
router.patch('/:id',verifyToken,tryCatch(controller.updateEvent))

/*Delete a Eventos*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteEvent))


module.exports = router;