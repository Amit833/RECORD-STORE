const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");
const { addPayment } = require("../controllers/paymentController");

router.route("/").post(addPayment);

module.exports = router;
