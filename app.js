const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const helmet = require("helmet");
const compression = require("compression");
const MongoStore = require("connect-mongo");
require("./lib/passport");

dotenv.config();

const indexRouter = require("./routes/index");

const app = express();
app.use(helmet());
app.use(compression());

mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(process.env.MONGODB_DEV);
}
main().catch((err) => console.log(err));

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGODB_DEV,
  collectionName: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    user: req.user,
  });
});

module.exports = app;
