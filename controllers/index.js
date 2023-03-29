const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

const getSignUp = (req, res, next) => {
  res.render("signup");
};

const getLogIn = (req, res, next) => {
  res.render("login");
};

module.exports = { getLogIn, getSignUp };
