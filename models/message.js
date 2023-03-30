const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["text", "image"], required: true },
});

MessageSchema.virtual("dateFormatted").get(function getDate() {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_SHORT);
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
