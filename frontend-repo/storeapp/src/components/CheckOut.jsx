import React from "react";
import { Link } from "react-router-dom";
import avatar9 from "../images/avatar9.jpg";
import "../css/checkout.css";

const CheckOut = () => {
  return (
    <div className="confirmation-box">
      <div className="empty_basket_container">
        <div className="checkout-img">
          <img src={avatar9} alt="empty" />
        </div>

        <div>
          <h2>Your Orders Confirmed!</h2>
        </div>
        <div>
          <p>Please Check Your Email!</p>
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

export default CheckOut;
