const jwt = require("jsonwebtoken");
const auth_pages = ["/login", "/register"];

module.exports = (app) => app.use(middleware);

function middleware(req, res, next) {
  const token = req.cookies.token;
  if (!token && req.url == "/") return res.redirect("/login");

  if (auth_pages.find((url) => url != req.url) && token) {
    // get user
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user) req.user = user;
    else res.redirect("/login");
  }

  next();
}
