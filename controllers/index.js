const { body, validationResult } = require("express-validator");
const passport = require("passport");
const Message = require("../models/message");
const User = require("../models/user");
const { generatePassword } = require("../lib/password");

const getIndex = async (req, res, next) => {
  try {
    const messages = Message.find({}).sort({ date: 1 }).exec();
    return res.render("index", {
      user: req.user,
      messages,
    });
  } catch (err) {
    return next(err);
  }
};

const getMembership = (req, res, next) => {
  res.render("membership");
};

const postMembership = async (req, res, next) => {
  if (req.body.answer.toLowerCase() === process.env.PASS_CODE.toLowerCase()) {
    try {
      await User.findByIdAndUpdate(req.user.id, { isMember: true }).exec();
      return res.redirect("/");
    } catch (err) {
      return next(err);
    }
  } else {
    return res.render("membership", {
      message: "Incorrect answer",
    });
  }
};

const getSignUp = (req, res, next) => {
  res.render("signup");
};

const postSignUp = async (req, res, next) => {
  const { salt, genHash } = generatePassword(req.body.password);
  const userCount = await User.countDocuments({}).exec();
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

module.exports = {
  getLogIn,
  getSignUp,
  postSignUp,
  postLogIn,
  getLogOut,
  getIndex,
  getMembership,
  postMembership,
};
