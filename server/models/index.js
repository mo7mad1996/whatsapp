const fs = require("fs");
const path = require("path");

// where is models directory ?
const models_path = path.join(__dirname, "models");

// imoprt models now!
const modles = fs.readdirSync(models_path, "utf-8");
modles.forEach((modle) => require(path.join(models_path, modle)));
