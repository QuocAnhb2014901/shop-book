const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    size: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Vaccine = mongoose.model("Vaccine", vaccineSchema);
module.exports = Vaccine;
