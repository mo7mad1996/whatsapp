const next = require("next");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const server = next({ dev });
const handle = server.getRequestHandler();

module.exports = (app) => {
  server
    .prepare()
    .then(() => {
      // Define any custom routes or middleware before the Next.js handler
      // Example: server.use('/api', require('./apiRoutes'));
      app.all("*", (req, res) => handle(req, res));

      app.listen(PORT, (err) => console.log("listen on port", PORT));
    })
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1);
    });
};
