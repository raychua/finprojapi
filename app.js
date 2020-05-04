const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const finprojv1 = require("./finproj_v1");
const app = express();

require("./utils/finprojDB");

var corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.get("/", (req, res) => {
  res.send("Hello!");
});
app.use("/v1", finprojv1);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
