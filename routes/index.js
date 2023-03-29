const express = require("express");
const router = express.Router();
const {
  getSignUp,
  getLogIn,
  postSignUp,
  postLogIn,
  getLogOut,
} = require("../controllers/index");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signup", getSignUp);
router.post("/signup", postSignUp);

router.get("/login", getLogIn);
router.post("/login", postLogIn);

router.get("/logout", getLogOut);

module.exports = router;
