const Finrecord = require("../models/finrecord");
const Category = require("../models/category");
const Person = require("../models/person");
const { uuid } = require("uuidv4");

const createOneRecord = async (req, res, next) => {
  console.log("In createOneRecord");
  try {
    const newFinRecord = {
      id: uuid(),
      personId: req.body.person,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      classification: req.body.classification,
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
    const personId = req.body.person;
    const finrecords = await Finrecord.find({ personId: personId });
    res.status(200).json(finrecords);
  } catch (err) {
    next(err);
  }
};

const getOneFinRecord = async (req, res, next) => {
  console.log("In getOneFinRecord:", req.finRecordId);
  try {
    const finRecordId = req.finRecordId;
    const finrecord = await Finrecord.findOne({ id: finRecordId });
    res.status(200).json(finrecord);
  } catch (err) {
    next(err);
  }
};

const updateOneFinRecord = async (req, res, next) => {
  console.log("In updateOneFinRecord:", req.finRecordId);
  try {
    const finRecordId = req.finRecordId;
    const updateFinRecord = {
      personId: req.body.person,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      classification: req.body.classification,
    };
    await Finrecord.findOneAndUpdate({ id: finRecordId }, updateFinRecord);
    res.status(200).json(updateFinRecord);
  } catch (err) {
    next(err);
  }
};

const deleteOneFinRecord = async (req, res, next) => {
  console.log("In deleteOneFinRecord:", req.finRecordId);
  try {
    const finRecordId = req.finRecordId;

    await Finrecord.findOneAndDelete({ id: finRecordId });
    res.status(200).send("Record deleted successfully.");
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  console.log("In getAllCategories");
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const initCategories = async (req, res, next) => {
  console.log("In initCategories");
  try {
    let createFinRecord = new Category({ category: "Insurance" });
    await createFinRecord.save();
    createFinRecord = new Category({ category: "Family" });
    await createFinRecord.save();
    createFinRecord = new Category({ category: "Child 1" });
    await createFinRecord.save();
    createFinRecord = new Category({ category: "Child 2" });
    await createFinRecord.save();
    createFinRecord = new Category({ category: "Car" });
    await createFinRecord.save();
    createFinRecord = new Category({ category: "House" });
    await createFinRecord.save();
    createFinRecord = new Category({ category: "Expenditure" });
    await createFinRecord.save();
    createFinRecord = new Category({ category: "Taxes" });
    await createFinRecord.save();
    createFinRecord = new Category({ category: "Savings" });
    await createFinRecord.save();
    res.status(201).send("Categories initialised");
  } catch (err) {
    next(err);
  }
};

const getMainDisplay = async (req, res, next) => {
  console.log("In getMainDisplay");

  try {
    let mainDisplay = {
      categoryExpenditures: [],
      totalExpenditure: 0,
      investment: 0,
      expenditure: 0,
      savings: 0,
    };

    mainDisplay.people = await Person.find({});
    mainDisplay.totalGrossIncome = mainDisplay.people.reduce(
      (accum, person) => {
        return accum + person.grossIncome;
      },
      0
    );
    mainDisplay.totalNetIncome = mainDisplay.people.reduce((accum, person) => {
      return accum + person.netIncome;
    }, 0);
    console.log("mainDisplay.totalGrossIncome:" + mainDisplay.totalGrossIncome);
    console.log("mainDisplay.totalNetIncome:" + mainDisplay.totalNetIncome);

    categories = await Category.find({});
    await Promise.all(
      categories.map(async (category) => {
        let categoryExpenditure = {};
        const items = await Finrecord.find({ category: category.category });
        items.map((item, index) => {
          if (index === 0) {
            categoryExpenditure.category = category.category;
            categoryExpenditure.totalAmount = item.amount;
          } else {
            categoryExpenditure.totalAmount += item.amount;
          }

          mainDisplay.totalExpenditure += item.amount;
          item.classification === "Investment"
            ? (mainDisplay.investment += item.amount)
            : (mainDisplay.expenditure += item.amount);
        });
        if (items.length > 0) {
          categoryExpenditure.percentage = (
            (categoryExpenditure.totalAmount / mainDisplay.totalNetIncome) *
            100
          ).toFixed(1);
          mainDisplay.categoryExpenditures.push(categoryExpenditure);
        }
      })
    );

    mainDisplay.savings =
      mainDisplay.totalNetIncome - mainDisplay.totalExpenditure;
    mainDisplay.savingsPercent = (
      (mainDisplay.savings / mainDisplay.totalNetIncome) *
      100
    ).toFixed(1);
    mainDisplay.investment += mainDisplay.savings;
    mainDisplay.investmentPercent = (
      (mainDisplay.investment / mainDisplay.totalNetIncome) *
      100
    ).toFixed(1);
    mainDisplay.expenditurePercent = (
      (mainDisplay.expenditure / mainDisplay.totalNetIncome) *
      100
    ).toFixed(1);

    const peopleExpenditure = await Promise.all(
      mainDisplay.people.map(async (person) => {
        mainDisplay[person.name] = await Finrecord.find({
          personId: person.id,
        });
        let expenditure = 0;
        mainDisplay[person.name].forEach((item) => {
          expenditure += item.amount;
        });
        let personExpenditure = JSON.parse(JSON.stringify(person));
        personExpenditure.expenditure = expenditure;
        personExpenditure.name = person.name;
        personExpenditure.savings = person.netIncome - expenditure;
        personExpenditure.savingsPercent = (
          (personExpenditure.savings / person.netIncome) *
          100
        ).toFixed(1);
        console.log(personExpenditure);
        return personExpenditure;
      })
    );
    mainDisplay.people = peopleExpenditure;
    console.log(mainDisplay);
    res.status(200).json(mainDisplay);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOneRecord,
  getAllRecordsbyPerson,
  getAllCategories,
  initCategories,
  getMainDisplay,
  getOneFinRecord,
  updateOneFinRecord,
  deleteOneFinRecord,
};
