const epxress = require("express");
const router = epxress.Router();
const {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/categoryController");
const { isAdmin, allowRole } = require("../middleware/middlewareController");

router.post("/add", allowRole(["admin", "nhanvien"]), addCategory);
router.get("/", getCategory);
router.delete("/delete/:id", allowRole(["admin", "nhanvien"]), deleteCategory);
router.put("/update", allowRole(["admin", "nhanvien"]), updateCategory);

module.exports = router;
