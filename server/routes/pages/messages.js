const mongoose = require("mongoose");

// database
const Messages = mongoose.model("messages");

module.exports = (app) => {
  // GET
  app.get("/", (req, res) => {
    Messages.find().then((d) => res.json(d));
  });

  // POST
  /**
   * this route to create a new message
   * @url /api/message
   * @method POST
   *
   * accept request body like:
   * @param  message: String,
   * @param  name: String,
   * @param  received: Boolean,
   *
   */
  app.post("/", (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage)
      .then((data) => res.status(201).json(data))
      .catch((err) => res.status(500).json(err));
  });

  // must return
  return app;
};
