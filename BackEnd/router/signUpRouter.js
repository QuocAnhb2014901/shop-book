const express = require("express");
const router = express.Router();
const User = require("../models/Users");
// const signUpController = require("../controller/auth/signUpController");

router.post("/", async (req, res) => {
  const { username, password, email, phone, age, gender, address } = req.body;
  const user = new User({
    username,
    password,
    email,
    phone,
    age,
    address,
    gender,
  });
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
