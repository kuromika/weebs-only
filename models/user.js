const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fakerUsername: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
