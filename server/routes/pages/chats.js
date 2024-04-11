const mongoose = require("mongoose");

// database
const Chats = mongoose.model("chats");
const Users = mongoose.model("user");

module.exports = (app) => {
  // GET
  app.get("/", (req, res) => {
    const { _id } = req.user;

    Users.findById(_id)
      .select("chats")
      .populate("chats")
      .then(({ chats }) => res.json(chats));
  });

  app.post("/to", async (req, res) => {
    const from_id = req.user._id;
    const to_id = req.body.id;

    const between = [from_id, to_id];

    const chat = await Chats.findOne({
      between: { $elemMatch: { $in: between } },
    })
      .populate("between")
      .populate("messages");

    console.clear();
    console.log(between);
    console.log(chat.between);

    if (chat) res.json(chat);
    else Chats.create({ between }).then((d) => res.json(d));
  });

  // must return
  return app;
};
