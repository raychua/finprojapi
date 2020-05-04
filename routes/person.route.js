const express = require("express");
const router = express.Router();
router.use(express.json());
const personcontroller = require("../controllers/person.controller");

router.post("/", personcontroller.createNewPerson);
router.get("/", personcontroller.getPeople);

module.exports = router;
