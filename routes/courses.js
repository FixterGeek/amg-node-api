const express = require("express");
const router = express.Router();
const controller = require("../controllers/courses");
//middlewares
const { verifyToken, checkIfAdmin } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Cursos*/
router.get('/',verifyToken,tryCatch(controller.getCourses))

/* Post all Cursos*/
router.post('/',verifyToken, checkIfAdmin, upload('courses').any(),tryCatch(controller.postCourse))

/* enroll  an Course*/
router.post('/:id/enroll',verifyToken,tryCatch(controller.enrollCourse))

/* unenroll an Course*/
router.delete('/:id/unenroll',verifyToken,tryCatch(controller.unenrollCourse))

/* add or remove a speaker*/
router.post('/:id/speaker',verifyToken,upload('speakers').any(),tryCatch(controller.addSpeaker))

/*Get a single Courseo*/
router.get('/:id',verifyToken,tryCatch(controller.getCourse))

/*Update a Cursos*/
router.patch('/:id',verifyToken,upload('courses').any(),tryCatch(controller.updateCourse))

/*Delete a Cursos*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteCourse))


module.exports = router;