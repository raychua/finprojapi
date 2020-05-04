const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceSchema = new Schema({
  id: {
    type: String,
    unique: true,
    sparse: true,
  },
  person: {
    type: Number,
  },
  name: {
    type: String,
  },
  number: {
    type: String,
  },
  company: {
    type: String,
  },
  premium: {
    type: Number,
  },
  paymentTerm: {
    type: String,
    enum: ["Monthly, Yearly"],
  },
  paymentMonth: {
    type: String,
    enum: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  paymentMethod: {
    type: String,
    enum: ["Giro", "Manual"],
  },
  paymentFrom: {
    type: String,
  },
  insuredParty: {
    type: String,
  },
  yearCommenced: {
    type: Number,
    min: 2000,
  },
  actionRequired: {
    type: String,
  },
  yearStopped: {
    type: Number,
    min: 2020,
  },
  expectedLumpInreturns: {
    type: Number,
  },
  expectedRoutineReturns: {
    type: Number,
  },
  expectedRoutineTerms: {
    type: String,
    enum: ["Monthly", "Yearly"],
  },
});

const finrecordSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  personId: {
    type: String,
  },
  title: {
    type: String,
    minlength: 3,
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
  },
  classification: {
    type: String,
    enum: ["Investment", "Expenditure"],
  },

  Insurance: insuranceSchema,
});

const Finrecord = mongoose.model("Finrecord", finrecordSchema);
module.exports = Finrecord;
