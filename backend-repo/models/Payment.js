const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
  date: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  cardNumber: { type: Number },
  name: { type: String },
  email: { type: String },
  amount: { type: String },
  shippingAddress: { type: String },
});

const Payment = model("Payment", PaymentSchema);
module.exports = Payment;
