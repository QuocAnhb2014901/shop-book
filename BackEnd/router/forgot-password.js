const express = require("express");
const router = express.Router();
const { forgotPassword } = require("../controller/forgotPasswordController");

router.post("/", forgotPassword);

module.exports = router;
