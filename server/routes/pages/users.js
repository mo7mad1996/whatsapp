// packages and modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

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
    const user = await Users.find().or([{ username }, { email: username }]);
    if (!user) return res.status(401).send("username or password is wrong");

    // 3) isvalid password
    const ok = bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(401).send("username or password is wrong");

    // 4) reteun the tocken
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
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
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.json({ token });
      })
      .catch(() =>
        res.status(500).send("can't add new user, do you have account?")
      );
  });

  // must return
  return app;
};
