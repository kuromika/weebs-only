const createUnathorizedError = (message) => {
  const err = new Error(message);
  err.status = 401;
  return err;
};

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createUnathorizedError("You need to log in to use this resource."));
  }
};

const isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isMember) {
    next();
  } else {
    next(
      createUnathorizedError("You need to become a member to use this resouce.")
    );
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    next(createUnathorizedError("Only admins can use this resource."));
  }
};

module.exports = { isAuth, isMember, isAdmin };
