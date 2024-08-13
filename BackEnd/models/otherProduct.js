const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otherVaccineSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    address: {
      type: String,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const OtherVaccine = mongoose.model("OtherVaccine", otherVaccineSchema);
module.exports = OtherVaccine;
