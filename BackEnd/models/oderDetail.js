const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otherDetailVaccineSchema = new Schema(
  {
    otherVaccine_id: {
      type: Schema.Types.ObjectId,
      ref: "OtherVaccine",
    },
    vaccine_id: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
    },
    quantity: {
      type: Number,
    },
    totalPrices: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const OtherDetailVaccine = mongoose.model(
  "OtherDetailVaccine",
  otherDetailVaccineSchema
);
module.exports = OtherDetailVaccine;
