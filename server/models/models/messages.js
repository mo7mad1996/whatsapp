const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    from: { type: mongoose.Types.ObjectId, ref: "user" },
    chat_id: { type: mongoose.Types.ObjectId, ref: "chats" },
    message: { type: String },
  },
  { timestamp: true }
);

//collection
module.exports = mongoose.model("messages", schema);
