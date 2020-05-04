const express = require("express");
const api = express.Router();
const finrecordRouter = require("./routes/finrecord.route");
const personRouter = require("./routes/person.route");

api.use("/finrecords", finrecordRouter);
api.use("/person", personRouter);

api.get("/", (req, res) => {
  res.status(200).send("V1 of finproj api");
});

module.exports = api;
