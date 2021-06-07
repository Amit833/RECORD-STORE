import { useContext } from "react";
import { myContext } from "../context/myContext";
import { useHistory } from "react-router-dom";
import { sendOrder } from "../helpers/apiCall";
import Stripe from "./stripe";
import { deleteUserCart } from "../helpers/localStorage";

import "../css/cart.css";

const Cart = () => {
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

  const recordsList = cart.records.map((entry) => {
    console.log("entry", entry);
    return (
      <>
        <div className="record" key={entry.record._id}>
          <div className="img">
            <img src={entry.record.cover}></img>
          </div>
          <div className="info">
            <p className="title">{entry.record.title}</p>
            <p className="artist">{entry.record.artist}</p>
            <p className="price">
              {entry.quantity} x {entry.record.price} $
            </p>
          </div>
        </div>
      </>
    );
  });

  // from here I should send the  orders to backend
  const createOrder = async () => {
    let order = await sendOrder(
      { ...cart, ...{ userId: loginUser._id } },
      loginUser._id
    );
    if (!order.error) {
      setCart({ records: [], totalAmount: cart.totalAmount });

      setOrders([...[order], ...orders]);
      setCartCounter();
      // deleteUserCart();
    }
  };

  return (
    <div className="cart">
      <section>
        <>
          <h3>YOUR COLLECTIONS</h3>

          <div className="current-order">
            <div className="left">
              {cartCounter ? recordsList : history.push("/emptycart")}
            </div>
            <div className="right">
              <div className="img-right">
                <img src="https://images.squarespace-cdn.com/content/v1/5b767372506fbefa1c2e1a39/1580539244912-ZXECIDBHP72WUZ4PP4OD/ke17ZwdGBToddI8pDm48kIXUpvhBrBZPKoLIxiWlZx97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UW6r-5KZab7F0Ak3dvMWCwb56ceReDoNB9OE6BF3ct6_tN_KfIuurh-w-x7bjNuMJA/Heineken+Can+1.jpg?format=750w" />
              </div>
              <div className="total">
                <p className="header">ORDER TOTAL</p>
                <p className="amount">
                  {parseFloat(cart.totalAmount).toPrecision(4)} $
                </p>
              </div>
              <Stripe />
            </div>
          </div>
        </>
      </section>
    </div>
  );
};

export default Cart;
