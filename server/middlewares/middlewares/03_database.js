const mongoose = require("mongoose");

// database options
mongoose.set("strictQuery", true);

// ..:: connect to database ::..
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.error("can not connect to the database", err);
    throw err;
  });

module.exports = () => {};
