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
  postMessage,
  postImage,
  postDeleteMessage,
} = require("../controllers/index");

router.get("/", getIndex);

router.get("/signup", getSignUp);
router.post("/signup", postSignUp);

router.get("/login", getLogIn);
router.post("/login", postLogIn);

router.get("/logout", getLogOut);

router.get("/membership", getMembership);
router.post("/membership", postMembership);

router.post("/sendtext", postMessage);
router.post("/sendimage", postImage);

router.post("/deletemessage", postDeleteMessage);

module.exports = router;
