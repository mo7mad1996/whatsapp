// packages and modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// database
const Users = mongoose.model("user");
const Chats = mongoose.model("chats");

/**
 * this route should be
 * @url /api/users/...
 */
module.exports = (app) => {
  // login
  app.post("/login", async (req, res) => {
    // 1) get data
    const username = req.body.username;

    // 2) search
    const user = await Users.findOne().or([{ username }, { email: username }]);
    if (!user) return res.status(401).send("username or password is wrong");

    // 3) is valid password
    const ok = bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(401).send("username or password is wrong");

    // 4) return the token
    create_token(user, res);
  });

  // register
  app.post("/register", async (req, res) => {
    // 1) generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // 2) hash password
    const password = await bcrypt.hash(req.body.password, salt);

    // 3) save data
    Users.create({
      ...req.body,
      password,
    })
      .then((user) => create_token(user, res))
      .catch(() =>
        res.status(500).send("can't add new user, do you have account?")
      );
  });

  app.post("/search", (req, res) => {
    Users.find({
      $or: [
        { name: { $regex: req.body.search } },
        { username: { $regex: req.body.search } },
        { email: { $regex: req.body.search } },
      ],
    })
      .select(["name", "image"])
      .then((d) => res.json(d));
  });

  app.get("/me", (req, res) => res.send(req.user?._id));

  app.get("/:id", (req, res) => {
    let id = req.params.id;

    Users.findById(id)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).send(err));
  });

  // must return
  return app;
};
function create_token(user, res) {
  // create a token
  const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1day",
  });

  // set a token
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // One day
  });
  // redirect to /
  res.json({ token });
}
