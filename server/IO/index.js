const mongoose = require("mongoose");

// database
const User = mongoose.model("user");
const Messages = mongoose.model("messages");
const Chats = mongoose.model("chats");

module.exports = (socket, io) => {
  // ..:: on connection ::..

  // ..:: users ::..

  // ..:: connects
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
  socket.on("send message", async (msg, chat, cb) => {
    // 1) create a new message
    const mess = await Messages.create(msg);
    const message = await mess.populate("from");

    // 2) update the current chat =>  the last message and push a new message
    await Chats.findByIdAndUpdate(chat._id, {
      last_message: mess._id,
      $push: { messages: mess._id },
    });

    // 3) send message to every one in chat
    const sockets = chat.between.map((u) => u._id);

    io.to(chat._id).emit("update active chat", message); // update active chat
    sockets.forEach((u) => socket.to(u).emit("new message", message, chat._id)); // update sidebar
    cb(message, chat._id);
  });
};
