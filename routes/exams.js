const express = require("express");
const router = express.Router();
const controller = require("../controllers/exams");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch = (fn) => {
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all Examos*/
router.get('/',
  //verifyToken, 
  tryCatch(controller.getExams))

/* Post all Examos*/
router.post('/',
  //verifyToken, 
  tryCatch(controller.postExam))

/* assist or unassist an exam*/
router.post('/:id/assist', verifyToken, tryCatch(controller.assistExam))

/*Get a single Exam with validation for solved ones*/
router.get('/:id',
  verifyToken,
  tryCatch(controller.getExam))

/*Update a Examos*/
router.patch('/:id',
  //verifyToken,
  tryCatch(controller.updateExam))

/** Answer the exam */
router.post('/:id/answer',
  verifyToken,
  tryCatch(controller.answerExam))

/*Delete a Examos*/
router.delete('/:id', verifyToken, tryCatch(controller.deleteExam))


module.exports = router;