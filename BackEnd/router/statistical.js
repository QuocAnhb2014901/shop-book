const express = require("express");
const router = express.Router();

const {statistical} = require('../controller/statisticalController');

router.get('/',statistical);

module.exports = router;
