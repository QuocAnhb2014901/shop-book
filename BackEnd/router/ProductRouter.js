const express = require("express");
const router = express.Router();
const {
  addVaccine,
  getVaccine,
  deleteVaccine,
  updateVaccine,
  getVaccineById,
} = require("../controller/ProductsController");
  const { isAdmin, allowRole } = require("../middleware/middlewareController");
  const fileUpload = require("../middleware/cloudinary");

router.post(
  "/",
  allowRole(["admin", "nhanvien"]),
  fileUpload.single("image"),
  addVaccine
);
router.get("/", getVaccine);
router.delete("/:id", allowRole(["admin", "nhanvien"]), deleteVaccine);
router.put(
  "/:id",
  allowRole(["admin", "nhanvien"]),
  fileUpload.single("image"),
  updateVaccine
);
router.get("/:id", getVaccineById);
module.exports = router;
