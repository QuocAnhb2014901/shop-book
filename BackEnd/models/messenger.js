const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messengerSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Messenger = mongoose.model("Messenger", messengerSchema);
module.exports = Messenger;
