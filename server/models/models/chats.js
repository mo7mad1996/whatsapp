const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    between: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    last_message: { type: mongoose.Types.ObjectId, ref: "messages" },
    messages: [{ type: mongoose.Types.ObjectId, ref: "messages" }],
  },
  { timestamp: true }
);

//collection
module.exports = mongoose.model("chats", schema);
