const express = require("express");
const router = express.Router();
const controller = require("../controllers/examResponses");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all ExamResponseos*/
router.get('/',verifyToken,tryCatch(controller.getExamResponses))

/* Post all ExamResponseos*/
router.post('/',verifyToken,tryCatch(controller.postExamResponse))

/* assist or unassist an examResponse*/
router.post('/:id/assist',verifyToken,tryCatch(controller.assistExamResponse))

/*Get a single ExamResponseos*/
router.get('/:id',verifyToken,tryCatch(controller.getExamResponse))

/*Update a ExamResponseos*/
router.patch('/:id',verifyToken,tryCatch(controller.updateExamResponse))

/*Delete a ExamResponseos*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteExamResponse))


module.exports = router;