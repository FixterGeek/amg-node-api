const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
//middlewares
const passport = require("passport");
const { verifyToken } = require("../helpers/jwt");

const tryCatch=(fn) =>{
  return (req, res, next) => {
    return fn(req, res).catch(e => next(e));
  };
}
/* Get the logged user*/
router.get('/self',verifyToken,tryCatch(controller.self))

/*Post to login and return user and token*/
router.post("/login",tryCatch(controller.login))

/*Post to register a new user, email and pass needed*/
router.post("/signup",upload('users').single('photo'), tryCatch(controller.signup));

/* REset Password*/
router.post("/change",verifyToken, tryCatch(controller.changePass));

/* forgot Password*/
router.post("/forgot",verifyToken, tryCatch(controller.forgotPass));


module.exports = router;