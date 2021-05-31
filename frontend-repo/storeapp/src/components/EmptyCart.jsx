import React from "react";
import { Link } from "react-router-dom";
import avatar9 from "../images/avatar4.jpg";
import "../css/checkout.css";

const EmptyCart = () => {
  return (
    <div className="confirmation-box">
      <div className="empty_basket_container">
        <div className="checkout-img">
          <img src={avatar9} alt="empty" />
        </div>

        <div>
          <h2>Cart is Empty !</h2>
        </div>

        <div>
          <p>Shop today's deals</p>
        </div>
        <div className="btn_goback_container">
          <Link to="/store">
            <button>Shop More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
