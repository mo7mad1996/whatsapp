// const react = require("react-scripts/scripts/start");

const WebpackDevServer = require("webpack-dev-server");
const port = process.env.PORT || 3000;

module.exports = (app) => {
  // app.use(require("react-scripts/scripts/start"));
  app.listen(port, (_) => console.log("listen on port", port));
};
