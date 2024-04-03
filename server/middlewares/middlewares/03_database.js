const mongoose = require("mongoose");

// database options
mongoose.set("strictQuery", true);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// ..:: connect to database ::..
mongoose
  .connect(process.env.DB_URI, options)
  .then(() => console.log("connected to database"))
  .catch((err) => {
    throw err;
  });

module.exports = () => {};
