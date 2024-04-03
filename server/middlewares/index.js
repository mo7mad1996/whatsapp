// ..:: packages ::..
const fs = require("fs");
const path = require("path");

// where is middleware dir ?
const middlewares_path = path.join(__dirname, "middlewares");

module.exports = async (app) => {
  // import each middleware in this dir
  const middlewares = await fs.readdirSync(middlewares_path, "utf-8");

  middlewares.forEach((middleware) =>
    require(path.join(middlewares_path, middleware))(app)
  );
};
