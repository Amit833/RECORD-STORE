const Payment = require("../models/Payment");
const customError = require("../helpers/customError");
// const stripe = require("stripe")(
//   "sk_test_51IsllTFfKkG9FeO92m5fTmnzRMlUfaeZmw1k5Ttx1A6wIiWYCVhHc3z9BLHYbR4ENnNYIRrbNxbH6uJed2jUy8FZ00dHHuUOJe"
// );

exports.addPayment = async (req, res, next) => {
  const { cart, token } = req.body;
  console.log("addpaymentcalled");
  try {
    const payments = await Payment.create(req.body);
    res.json(payments);
  } catch (err) {
    next(err);
  }
};
