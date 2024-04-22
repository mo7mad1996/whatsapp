const mongoose = require("mongoose");

// database
const Chats = mongoose.model("chats");
const Users = mongoose.model("user");
const Messages = mongoose.model("messages");

module.exports = (app) => {
  // GET
  app.get("/", (req, res) => {
    const { _id } = req.user;

    Users.findById(_id)
      .select("chats")
      .populate({
        path: "chats",
        populate: ["last_message", "between"],
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

  // create a new chat
  app.post("/", async (req, res) => {
    //  get the user id from request body and add to
    const from_id = req.user._id;
    const users = req.body.to;

    const between = [...new Set([from_id, ...users])];

    // check if is any chat with users
    const chat = await Chats.findOne({
      between: { $all: between, $size: between.length },
    });

    if (chat) res.json(chat._id);
    else {
      // 1) crate a new chat
      const ch = await Chats.create({ between });
      const chat = await ch.populate("between");

      // 2) create a new message
      const msg = {
        from: from_id,
        chat_id: chat._id,
        message: req.body.message,
      };
      const message = await Messages.create(msg);

      // 3) append the message in chat
      await Chats.updateOne(
        { _id: chat._id },
        {
          $push: { messages: message },
          last_message: message._id,
        }
      );

      // 4) append the chat for users
      await Users.updateMany(
        { _id: { $in: between } },
        { $push: { chats: chat } }
      );

      // 5) update the users have a new chat
      const io = process.io;
      between.forEach((id) => io.to(id).emit("new message", message, chat));

      // 6) return the created chat
      res.json(chat._id);
    }
  });

  app.post("/to", async (req, res) => {
    //   const from_id = req.user._id;
    //   const to_id = req.body.id;
    //   const between = [from_id, to_id];
    //   const chat = await Chats.findOne({
    //     between: { $all: between },
    //   })
    //     .populate("between")
    //     .populate("messages");
    //   if (chat) res.json(chat);
    //   else {
    //     const chat = await Chats.create({ between });
    //     Users.updateMany(
    //       { _id: { $in: between } },
    //       { $push: { chats: chat._id } }
    //     ).then(() => res.json(chat));
    //   }
  });

  app.get("/:id", (req, res) => {
    Chats.findById(req.params.id)
      .populate(["between", "messages"])
      .then((chat) => res.json(chat));
  });

  // must return
  return app;
};
