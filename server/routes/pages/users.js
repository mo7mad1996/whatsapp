// packages and modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const user = require("../../models/models/user");

// database
const Users = mongoose.model("user");

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

    // 3) isvalid password
    const ok = bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(401).send("username or password is wrong");

    // 4) reteun the tocken
    create_token(user, res);
  });

  app.get("/:id", (req, res) => {
    let id = req.params.id;

    Users.findById(id)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).send(err));
  });

  // register
  app.post("/register", async (req, res) => {
    // 1) genrate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // 2) hash password
    const password = await bcrypt.hash(req.body.password, salt);

    // 3) save data
    Users.create({
      ...req.body,
      password,
    })
      .then((user) => {
        create_token(user, res);
      })
      .catch(() =>
        res.status(500).send("can't add new user, do you have account?")
      );
  });

  app.post("/search", (req, res) => {
    user
      .find()
      .find({
        $or: [
          {
            name: {
              $regex: req.body.search,
            },
          },
          {
            username: {
              $regex: req.body.search,
            },
          },
          {
            email: {
              $regex: req.body.search,
            },
          },
        ],
      })
      .select("name")
      .then((d) => res.json(d));
  });

  // must return
  return app;
};

function create_token(user, res) {
  const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1day",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // One day
  });

  res.send(token);
}
