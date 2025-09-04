const express = require("express");
const cookieParser = require("cookie-parser");
const serverless = require("serverless-http");
const routes = require("./routes"); 

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World 🚀 from Vercel");
});

app.use("/api", routes);

module.exports = serverless(app);
