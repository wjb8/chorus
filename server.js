// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const db = require('./db/db');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['123abc'],

  maxAge: 34 * 60 * 60 * 1000 //24hrs
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
const listingsRouter = require("./routes/listings");
const messagesRouter = require("./routes/messages");
const loginRouter = require("./routes/login");
const favoritesRouter = require("./routes/favorites");

// Mount all resource routes
app.use('/listings', listingsRouter);
app.use('/messages', messagesRouter);
app.use('/login', loginRouter);
app.use('/favorites', favoritesRouter);

// Home page
// Warning: avoid creating more routes in this file!
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
