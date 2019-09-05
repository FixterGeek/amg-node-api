const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
//middlewares
const { verifyToken } = require("../helpers/jwt");
const {upload} = require('../helpers/cloudinary')

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}


/*follow unfollow users */
router.post('/:id/follow', verifyToken, tryCatch(controller.followUser))

/* Get all users*/
router.get('/',verifyToken,tryCatch(controller.getUsers))

// get summary of users (counts)
router.get('/summary',verifyToken,tryCatch(controller.getUsersSummary))

/*Get a single user*/
router.get('/:id',verifyToken,tryCatch(controller.getUser))

/*Update a user*/
router.patch('/:id',verifyToken,upload('users').any(),tryCatch(controller.updateUser))

/*Delete a user*/
router.delete('/:id',verifyToken,tryCatch(controller.deleteUser))


module.exports = router;