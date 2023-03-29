const express = require("express");
const router = express.Router();
const { getSignUp, getLogIn } = require("../controllers/index");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signup", getSignUp);
router.get("/login", getLogIn);

module.exports = router;
