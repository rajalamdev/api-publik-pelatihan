const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("../routes"); // import routes/index.js
const serverless = require("serverless-http");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// default route
app.get("/", (req, res) => {
  res.send("Hello World 🚀");
  console.log("Hello World 🚀");
});

// pakai semua routing dari /routes
app.use(routes);

// export sebagai serverless handler, BUKAN app.listen()
module.exports = app;
module.exports.handler = serverless(app);
