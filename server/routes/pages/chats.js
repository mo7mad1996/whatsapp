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
      .populate({
        path: "chats",
        populate: ["last_message", "between", "messages"],
      })
      .then(({ chats }) =>
        res.json(
          chats.sort((a, b) => {
            const updatedAtA = a.updatedAt;
            const updatedAtB = b.updatedAt;
            return new Date(updatedAtB) - new Date(updatedAtA); // Sort in descending order
          })
        )
      );
  });

  app.post("/to", async (req, res) => {
    const from_id = req.user._id;
    const to_id = req.body.id;

    const between = [from_id, to_id];

    const chat = await Chats.findOne({
      between: { $all: between },
    })
      .populate("between")
      .populate("messages");

    if (chat) res.json(chat);
    else {
      const chat = await Chats.create({ between });

      Users.updateMany(
        { _id: { $in: between } },
        { $push: { chats: chat._id } }
      ).then(() => res.json(chat));
    }
  });

  // must return
  return app;
};
