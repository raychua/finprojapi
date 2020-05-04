const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    min: 3,
  },
  grossIncome: {
    type: Number,
  },
  netIncome: {
    type: Number,
  },
  monthlySaving: {
    type: Number,
  },
  monthlySavingPercent: {
    type: Number,
  },
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
