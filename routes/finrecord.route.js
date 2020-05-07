const express = require("express");
const router = express.Router();
router.use(express.json());
const finrecordController = require("../controllers/finrecord.controller");

router.param("id", (req, res, next, id) => {
  req.finRecordId = id;
  next();
});

router.post("/", finrecordController.createOneRecord);
router.get("/categories", finrecordController.getAllCategories);
router.post("/categories/init", finrecordController.initCategories);
router.get("/", finrecordController.getMainDisplay);
router.get("/:id", finrecordController.getOneFinRecord);

module.exports = router;
