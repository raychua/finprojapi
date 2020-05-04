const express = require("express");
const router = express.Router();
router.use(express.json());
const finrecordController = require("../controllers/finrecord.controller");

router.post("/", finrecordController.createOneRecord);
router.get("/", finrecordController.getAllRecordsbyPerson);

module.exports = router;
