const Finrecord = require("../models/finrecord");
const { uuid } = require("uuidv4");

const createOneRecord = async (req, res, next) => {
  console.log("In createOneRecord");
  try {
    const newFinRecord = {
      id: uuid(),
      person: req.body.person,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      classification: req.body.classification,
      group: req.body.group,
    };
    const createFinRecord = new Finrecord(newFinRecord);
    await createFinRecord.save();
    res.status(201).json(newFinRecord);
  } catch (err) {
    next(err);
  }
};

const getAllRecordsbyPerson = async (req, res, next) => {
  console.log("In getAllRecordsbyPerson");
  try {
    const id = req.body.person;
    const finrecords = await Finrecord.find({ person: id });
    res.status(200).json(finrecords);
  } catch (err) {
    next(err);
  }
};
module.exports = { createOneRecord, getAllRecordsbyPerson };
