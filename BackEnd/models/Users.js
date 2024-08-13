const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vaccine",
      },
    ],
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    address: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    age: {
      type: Date,
      // required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    gender: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      // minlength: 3,
    },
    avatar: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods = {
  isValidPassword: async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  },
  createChangePasswordToken() {
    const key = "2wpowcczxcxznnmjdeaior@@@##";
    const passwordResetExpires = Date.now() + 5 * 60 * 1000;
    const passwordReset = crypto
      .createHash("shake256", { outputLength: 20 })
      .update(key)
      .digest("hex");
    this.resetPasswordToken = passwordReset;
    this.resetPasswordExpires = passwordResetExpires;
    return {
      passwordReset,
      passwordResetExpires,
    };
  },
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
