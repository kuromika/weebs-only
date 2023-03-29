const express = require("express");
const router = express.Router();
const {
  getSignUp,
  getLogIn,
  postSignUp,
  postLogIn,
  getLogOut,
  getIndex,
} = require("../controllers/index");

router.get("/", getIndex);

router.get("/signup", getSignUp);
router.post("/signup", postSignUp);

router.get("/login", getLogIn);
router.post("/login", postLogIn);

router.get("/logout", getLogOut);

module.exports = router;
