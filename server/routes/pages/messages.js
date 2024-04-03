const mongoose = require("mongoose");

// database
const Messages = mongoose.model("messages");

console.log(Messages);
module.exports = (app) => {
  // GET
  app.get("/sync", (req, res) => {
    Messages.find((err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send(data);
      }
    });
  });

  // POST
  app.post("/new", (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });

  // must return
  return app;
};
