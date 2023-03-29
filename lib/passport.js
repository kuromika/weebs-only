const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const { validatePassword } = require("./password");

const verify = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, "Incorrect username");
    }
    const isValid = validatePassword(password, user.hash, user.salt);
    if (isValid) {
      return done(null, user);
    }
    return done(null, false, "Incorrect password");
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
