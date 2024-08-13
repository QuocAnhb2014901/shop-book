const express = require("express");
const router = express.Router();

const {
  getUsers,
  updateUser,
  getUserById,
  updateRole,
  wishListProduct,
  getWishListProduct,
} = require("../controller/userController");
const { isAdmin, allowRole } = require("../middleware/middlewareController");
const fileUpload = require("../middleware/cloudinary");

router.get("/", allowRole(["admin"]), getUsers);
router.put("/updateRole", updateRole);
router.put("/:id", fileUpload.single("avatar"), updateUser);
router.get("/:id", getUserById);
router.post("/wishListProduct", wishListProduct);
router.get("/wishListProduct/:id", getWishListProduct);

module.exports = router;
