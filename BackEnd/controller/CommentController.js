const Vaccine = require("../models/Product");
const Comment = require("../models/Comment");
const addComment = async (req, res) => {
  const { user_id, vaccine_id, content } = req.body;
  try {
    const vaccine = await Vaccine.findById(vaccine_id);
    if (!vaccine) return res.status(400).json({ message: "Vaccine not found" });
    const comment = new Comment({
      user_id,
      vaccine_id,
      content,
    });
    await comment.save();
    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await Comment.find()
      .populate("user_id", "username")
      .populate("vaccine_id");
    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentByVaccineId = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.find({ vaccine_id: id })
      .populate("user_id", "username")
      .populate("vaccine_id");
    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCommentByAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addComment,
  getComment,
  getCommentByVaccineId,
  deleteCommentByAuthor,
};
