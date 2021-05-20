const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");

const { addOrder, getOrder } = require("../controllers/orderController");

router.route("/").get(auth, getOrder).post(addOrder);

module.exports = router;
