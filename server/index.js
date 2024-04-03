// ..:: packages ::..
const express = require("express");

// ..:: Constants ::..
const app = express();

// ..:: models ::..
require("./models");

// ..:: middlewares ::..
require("./middlewares")(app);

// ..:: routes ::..
require("./routes")(app, express);
