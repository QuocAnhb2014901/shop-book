const express = require("express");
const {
  addOtherVaccine,
  getOtherVaccine,
  getOtherById,
  updateStatusOder,
} = require("../controller/oderController");
const router = express.Router();

router.post("/add", addOtherVaccine);
router.get("/", getOtherVaccine);
router.get("/:id", getOtherById);
router.put("/update", updateStatusOder);

module.exports = router;
