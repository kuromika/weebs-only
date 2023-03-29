const { body, validationResult } = require("express-validator");
const passport = require("passport");
const Message = require("../models/message");
const User = require("../models/user");
const { generatePassword } = require("../lib/password");
const { isMember, isAuth } = require("../lib/auth");

const isMemberAlready = (req, res, next) => {
  if (req.user.isMember) {
    const err = new Error("You're a member already!");
    err.status = 401;
    next(err);
  } else {
    next();
  }
};

const getIndex = async (req, res, next) => {
  try {
    const messages = await Message.find({})
      .sort({ date: 1 })
      .populate("user")
      .exec();
    return res.render("index", {
      user: req.user,
      messages,
    });
  } catch (err) {
    return next(err);
  }
};

const getMembership = [
  isAuth,
  isMemberAlready,
  (req, res, next) => {
    res.render("membership");
  },
];

const postMembership = [
  isAuth,
  isMemberAlready,
  async (req, res, next) => {
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
  },
];

const getSignUp = (req, res, next) => {
  res.render("signup");
};

const postSignUp = async (req, res, next) => {
  const { salt, genHash } = generatePassword(req.body.password);
  const userCount = await User.countDocuments({}).exec();
  const isAdmin =
    req.body["admin-pass"].toLowerCase() ===
    process.env.ADMIN_CODE.toLowerCase();
  const newUser = new User({
    username: req.body.username,
    hash: genHash,
    salt,
    fakeUsername: `Weeb Member ${userCount.toString().padStart(3, "0")}`,
    isMember: isAdmin,
    isAdmin,
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

const postMessage = [
  isMember,
  async (req, res, next) => {
    const message = new Message({
      text: req.body.message,
      user: req.user,
    });
    try {
      await message.save();
    } catch (err) {
      return next(err);
    }
    return res.redirect("/");
  },
];

module.exports = {
  getLogIn,
  getSignUp,
  postSignUp,
  postLogIn,
  getLogOut,
  getIndex,
  getMembership,
  postMembership,
  postMessage,
};
