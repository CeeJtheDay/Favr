const exjwt = require("express-jwt");
require("dotenv").config();
// Init the express-jwt middleware
const isAuthenticated = exjwt({
  secret: process.env.SERVER_SECRET
});

module.exports = isAuthenticated;
