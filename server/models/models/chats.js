const mongoose = require("mongoose");

const whatsappSchema = mongoose.Schema(
  {
    between: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    last_message: String,
    received: Boolean,
  },
  { timestamp: true }
);

//collection
module.exports = mongoose.model("chats", whatsappSchema);
