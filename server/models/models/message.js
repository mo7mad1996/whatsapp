const mongoose = require("mongoose");

const whatsappSchema = mongoose.Schema(
  {
    message: String,
    name: String,
    received: Boolean,
  },
  { timestamp: true }
);

//collection
module.exports = mongoose.model("messages", whatsappSchema);
