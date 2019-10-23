const express = require("express");
const router = express.Router();
const controller = require("../controllers/courseActivities");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all courseos*/
router.get('/',verifyToken,tryCatch(controller.getCourseActivities))

/* Post all courseos*/
router.post('/',verifyToken,upload('courseActivities').any(),tryCatch(controller.postCourseActivity))

/* enroll  an course*/
router.post('/:id/enroll',verifyToken,tryCatch(controller.enrollCourseActivity))

/* unenroll an course*/
router.delete('/:id/unenroll',verifyToken,tryCatch(controller.unenrollCourseActivity))

/*Get a single courseos*/
router.get('/:id',verifyToken,tryCatch(controller.getCourseActivity))

/*Update a courseos*/
router.patch('/:id',verifyToken,tryCatch(controller.updateCourseActivity))

/*Delete a courseos*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteCourseActivity))


module.exports = router;