const mongoose = require("mongoose");

// database
const Messages = mongoose.model("messages");
const Chats = mongoose.model("chats");

module.exports = (app) => {
  // app.post("/new", (req, res) => {
  //   Messages.create({
  //     ...req.body,
  //     from: req.user._id,
  //   }).then((d) =>
  //     Chats.findByIdAndUpdate(req.body.chat_id, {
  //       $push: { messages: d._id },
  //     })
  //   );
  // });

  return app;
};
