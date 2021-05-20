const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");
const { payment } = require("../controllers/paymentController");

router.route("/").get( payment);

module.exports = router;
