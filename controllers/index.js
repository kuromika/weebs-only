const { body, validationResult } = require("express-validator");
const passport = require("passport");
const Message = require("../models/message");
const User = require("../models/user");
const { generatePassword } = require("../lib/password");

const getSignUp = (req, res, next) => {
  res.render("signup");
};

const postSignUp = async (req, res, next) => {
  const { salt, genHash } = generatePassword(req.body.password);
  const userCount = await User.countDocuments({});
  const newUser = new User({
    username: req.body.username,
    hash: genHash,
    salt,
    fakerUsername: `Weeb Member ${userCount.toString().padStart(3, "0")}`,
  });
  try {
    await newUser.save();
  } catch (err) {
    return next(err);
  }
  return res.redirect("/");
};

const getLogIn = (req, res, next) => {
  res.render("login");
};

const postLogIn = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: "Check your username and password, then try again",
  successRedirect: "/",
});

const getLogOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};

module.exports = { getLogIn, getSignUp, postSignUp, postLogIn, getLogOut };
