const next = require("next");
const http = require("http");
const mongoose = require("mongoose");
const socketio = require("socket.io");

const IO = require("../../IO");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

// next.js
const next_server = next({ dev });
const handler = next_server.getRequestHandler();

// DB
const User = mongoose.model("user");

module.exports = (app) => {
  next_server
    .prepare()
    .then(() => {
      // set nextjs server to express
      app.all("*", (req, res) => handler(req, res));

      // set express server to node http server
      const server = http.Server(app);

      // socket.io server
      const io = socketio(server);

      io.use((socket, next) => {
        const user_id = socket.handshake.auth.user_id;

        if (user_id) {
          socket.user_id = user_id;
          socket.join(user_id);
        }

        next();
      });

      io.on("connect", (socket) => IO(socket, io));

      // start the application
      server.listen(PORT, () => console.log("listen on port", PORT));
    })
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1);
    });
};
