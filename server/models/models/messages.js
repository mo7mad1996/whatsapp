const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
    message: { type: String },
  },
  { timestamps: true }
);

//collection
module.exports = mongoose.model("messages", schema);
