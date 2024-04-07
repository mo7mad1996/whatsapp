const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, trim: true, unique: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  chats: [{ type: mongoose.Types.ObjectId, ref: "chats" }],
  lastseen: { type: Date },
});

module.exports = mongoose.model("user", Schema);
