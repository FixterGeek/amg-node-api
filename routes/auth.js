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
router.post("/login",passport.authenticate("local"),tryCatch(controller.login));

/*Post to register a new user, email and pass needed*/
router.post("/signup", tryCatch(controller.signup));


module.exports = router;