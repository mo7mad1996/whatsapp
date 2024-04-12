const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    between: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    last_message: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],
  },
  { timestamps: true }
);

//collection
module.exports = mongoose.model("chats", schema);
