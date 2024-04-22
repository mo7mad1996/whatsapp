const mongoose = require("mongoose");

// database
const User = mongoose.model("user");
const Messages = mongoose.model("messages");
const Chats = mongoose.model("chats");

module.exports = (socket, io) => {
  // ..:: on connection ::..

  // ..:: users ::..

  // ..:: connects ::..
  socket.on("join", (room) => {
    const old = socket.room;
    if (old) socket.leave(old);

    socket.join(room);
    socket.room = room;
  });

  // ..:: messages ::..
  socket.on("get messages", (id, cb) => {
    cb();
  });
  socket.on("send message", async (msg, id) => {
    // 1) create a new message
    const mess = await Messages.create(msg);
    const message = await mess.populate("from");

    // 2) update the current chat =>  the last message and push a new message
    const ch = await Chats.findByIdAndUpdate(id, {
      last_message: mess._id,
      $push: { messages: mess._id },
    });

    const chat = await ch.populate("between");

    // 3) send message to every one in chat
    const sockets = chat.between.map((u) => u._id.toString());
    io.to(id).emit("update active chat", message); // update active chat
    sockets.forEach((u) => io.to(u).emit("new message", message, chat)); // update sidebar
  });
};
