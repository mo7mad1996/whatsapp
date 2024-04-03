const fs = require("fs");
const path = require("path");

// get the pages directory
const pages_dir = path.join(__dirname, "pages");

module.exports = async (app, express) => {
  // pages
  const pages = await fs.readdirSync(pages_dir);

  // create a api routes
  pages.forEach((page) => {
    const route = page.split(".")[0]; // page name
    const router = express.Router();

    app.use(`/api/${route}`, require(path.join(pages_dir, page))(router));
  });
};
