const express = require("express");
const router = express.Router();
const {
  addComment,
  getComment,
  getCommentByVaccineId,
  deleteCommentByAuthor,
} = require("../controller/CommentController");
const { allowRole } = require("../middleware/middlewareController");

router.post("/addComment", allowRole(["admin", "nhanvien", "user"]), addComment);
router.get("/getComment", getComment);
router.get("/getCommentByVaccineId/:id", getCommentByVaccineId);
router.delete("/deleteCommentByAuthor/:id", deleteCommentByAuthor);

module.exports = router;
