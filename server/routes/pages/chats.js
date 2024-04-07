const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// database
const Chats = mongoose.model("chats");
const Users = mongoose.model("user");

module.exports = (app) => {
  // GET
  app.get("/", (req, res) => {
    // get user
    const token = req.cookies.token;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
      return res.status(401).send("please, login!");
    }
    const { _id } = user;
    Users.findById(_id)
      .select("chats")
      .populate("chats")
      .then((d) => console.log(d));

    // return chats
    res.json([]);
  });

  // must return
  return app;
};
