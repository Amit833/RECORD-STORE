const User = require("../models/User");
const stripe = require("stripe")(
  "sk_test_51IsllTFfKkG9FeO92m5fTmnzRMlUfaeZmw1k5Ttx1A6wIiWYCVhHc3z9BLHYbR4ENnNYIRrbNxbH6uJed2jUy8FZ00dHHuUOJe"
);

const customError = require("../helpers/customError");

const uuid = require("uuid");

exports.payment = (req, res, next) => {
  res.json("hello");
  const { product, token } = req.body;
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })

    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

// try {
//     console.log("req.user=>", req.user);
//     res.clearCookie("token");
//     res.json("you successfully loggedout!");
//   } catch (error) {
//     next(customError("can not be logout!", 401));
//   }
