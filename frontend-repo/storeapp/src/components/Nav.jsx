import React, { useContext } from "react";
import { myContext } from "../context/myContext";
import { useParams, useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../helpers/apiCall";
import { clearUserInStorage, setUserInStorage } from "../helpers/localStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "../css/nav.css";

const Nav = () => {
  const context = useContext(myContext);
  const {
    userStatus,
    loginUser,
    setloginUser,
    setUserStatus,
    cartCounter,
    totalQuantity,
  } = context;
  let { id } = useParams();
  const history = useHistory();

  const fetchLoginData = () => {
    history.push(`/profile/${loginUser._id}`);
    // loginUser.id
  };

  const triggerLogout = () => {
    logoutUser();
    setloginUser();
    setUserStatus(false);
    clearUserInStorage();
    history.push("/login");
  };

  return (
    <div className="nav-wrapper">
      <div className="icons-wrapper">
        <div className="hero-wrapper">
          <Link to="/store">
            <h1>Record Store</h1>
          </Link>
        </div>
        {!loginUser && (
          <div className="btn-wrapper">
            <Link to="/login">
              <button className="nav-btn">Login</button>
            </Link>

            <Link to="/signup">
              <button className="nav-btn">Sign up</button>
            </Link>
          </div>
        )}
        {loginUser && (
          <div className="rightNav-wrapper">
            <div className="avatar-wrapper" onClick={fetchLoginData}>
              <img
                className="avatar-link"
                src={loginUser.avatar}
                alt="Your avatar"
              />
            </div>

            <div onClick={triggerLogout}>
              <button className="nav-btn">Logout</button>
            </div>

            <NavLink activeClassName="selected" exact to="/cart">
              {cartCounter && (
                <div className="cnt" data-content={totalQuantity}></div>
              )}
              <FontAwesomeIcon icon={faShoppingCart} />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
