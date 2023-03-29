const mongoose = require("mongoose");

require("dotenv").config();

const connection = mongoose.createConnection(process.env.MONGODB_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
