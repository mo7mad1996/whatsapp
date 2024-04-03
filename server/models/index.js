const fs = require("fs");
const path = require("path");

// where is models directory ?
const modles_path = path.join(__dirname, "models");

// imoprt models now!
const modles = fs.readdirSync(modles_path, "utf-8");
modles.forEach((modle) => require(path.join(modles_path, modle)));
