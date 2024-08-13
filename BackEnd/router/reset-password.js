const express = require("express");
const router = express.Router();
const { verifyPasswordToken } = require("../controller/resetPassword");

router.post("/", verifyPasswordToken);

module.exports = router;
