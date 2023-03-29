const express = require("express");
const router = express.Router();
const { getSignUp, getLogIn, postSignUp } = require("../controllers/index");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signup", getSignUp);
router.post("/signup", postSignUp);

router.get("/login", getLogIn);

module.exports = router;
