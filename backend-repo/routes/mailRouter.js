const express = require("express");
const router = express.Router();
// const { auth } = require("../middleware/authentication");
const { sendMail } = require("../controllers/mailController");

router.route("/").post(sendMail);

module.exports = router;
