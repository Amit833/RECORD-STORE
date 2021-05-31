const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middleware/validation");

const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

const { addOrder, getOrder } = require("../controllers/orderController");

//users
router.route("/").get(getUsers).post(validateSchema, addUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

// orders
router.route("/:id/orders").post(addOrder);
router.route("/:id/orders").get(getOrder);

module.exports = router;
