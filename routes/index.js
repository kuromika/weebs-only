const express = require("express");

const router = express.Router();
const {
  getSignUp,
  getLogIn,
  postSignUp,
  postLogIn,
  getLogOut,
  getIndex,
  getMembership,
  postMembership,
} = require("../controllers/index");

router.get("/", getIndex);

router.get("/signup", getSignUp);
router.post("/signup", postSignUp);

router.get("/login", getLogIn);
router.post("/login", postLogIn);

router.get("/logout", getLogOut);

router.get("/membership", getMembership);
router.post("/membership", postMembership);

module.exports = router;
