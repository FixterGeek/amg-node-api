const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
//middlewares
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get all users*/
router.get('/',verifyToken,tryCatch(controller.getUsers))

/*Get a single user*/
router.get('/:id',verifyToken,tryCatch(controller.getUser))

/*Update a user*/
router.patch('/:id',verifyToken,tryCatch(controller.updateUser))

/*Delete a user*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteUser))


module.exports = router;