const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    vaccine_id: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
