const Person = require("../models/person");
const { uuid } = require("uuidv4");

const createNewPerson = async (req, res, next) => {
  console.log("In createNewPerson");
  try {
    const newPerson = {
      id: uuid(),
      name: req.body.name,
      grossIncome: req.body.grossIncome,
      netIncome: req.body.netIncome,
    };
    const createdPerson = Person(newPerson);
    await createdPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    next(err);
  }
};

const getPeople = async (req, res, next) => {
  console.log("In getPeople");
  try {
    const people = await Person.find({});
    res.status(200).json(people);
  } catch (err) {
    next(err);
  }
};

module.exports = { createNewPerson, getPeople };
