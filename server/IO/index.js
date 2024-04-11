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
  socket.on("send message", async (msg, chat) => {
    // 1) create a new message
    const mess = await Messages.create(msg);
    const message = await mess.populate("from");

    // 2) update the current chat =>  the last message and push a new message
    await Chats.findByIdAndUpdate(chat._id, {
      last_message: message._id,
      $push: {
        messages: message._id,
      },
    });

    // 3) send message to every one in chat
    const sockets = chat.between
      .filter((u) => u._id != msg.from)
      .map((u) => u.socket_id);

    io.to(chat._id).emit("update active chat", message); // update active chat

    // sockets.forEach((s) => {
    //   io.in(s).emit("new message", message); // update sidebar
    // });
  });
};
