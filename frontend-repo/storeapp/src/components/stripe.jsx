import { useContext } from "react";
import { myContext } from "../context/myContext";
import StripeCheckout from "react-stripe-checkout";
import {
  sendPaymentInfo,
  sendOrder,
  sendPaymentInfoToMail,
} from "../helpers/apiCall";
import { useHistory } from "react-router-dom";
import { deleteUserCart } from "../helpers/localStorage";

const Stripe = () => {
  const history = useHistory();
  const {
    cart,
    loginUser,
    orders,
    setCart,
    setOrders,
    cartCounter,
    setCartCounter,
    setTotalQuantity,
  } = useContext(myContext);

  const makePayment = async (token) => {
    const body = {
      token,
      cart,
    };

    let order = await sendOrder(
      { ...cart, ...{ userId: loginUser._id } },
      loginUser._id
    );
    if (!order.error) {
      setCart({ records: [], totalAmount: 0 });

      setOrders([...[order], ...orders]);

      let info = await sendPaymentInfo({
        order: order._id,
        amount: cart.totalAmount,
        name: token.card.name,
        email: token.email,
        shippingAddress: token.card.address_city,
      });

      // this for confirmation email
      const mailInfo = await sendPaymentInfoToMail({
        email: token.email,
        amount: cart.totalAmount,
        name: token.card.name,
        address: token.card.address_line1,
        zip: token.card.address_zip,
        city: token.card.address_city,
        country: token.card.address_country,
      });

      history.push("/checkout");
      setCartCounter();
      deleteUserCart(loginUser._id);
    }
  };

  return (
    <>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={makePayment}
        name="Pay Now"
        shippingAddress
        billingAddress
      >
        <button className="buyNow-btn"> Buy Now</button>
      </StripeCheckout>
    </>
  );
};

export default Stripe;
