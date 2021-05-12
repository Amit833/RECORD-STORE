import React, { useContext } from "react";
import { myContext } from "../context/myContext";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiShoppingCart } from 'react-icons/hi';
import { logoutUser } from "../helpers/apiCall"
import { clearUserInStorage } from "../helpers/localStorage"

import "../css/nav.css";


const Nav = () => {
  const context = useContext(myContext);
  const { userStatus, loginUser, setloginUser, setUserStatus } = context;
  console.log("loginuser", loginUser);
  let { id } = useParams();
  const history = useHistory();


  const fetchLoginData = () => {
    history.push(`/profile/${loginUser._id}`);
    // loginUser.id
  };

  const triggerLogout = () => {
    logoutUser()
    setloginUser()
    setUserStatus(false)
    clearUserInStorage()
    history.push("/login")
  }

  return (
    <div className="nav-wrapper">
      <div className="hero-wrapper">
        <Link to="/store">
          <h1>Record Store</h1>
        </Link>
      </div>
      {!userStatus && (
        <div className="btn-wrapper">
          <Link to="/login">
            <button className="nav-btn">Login</button>
          </Link>

          <Link to="/signup">
            <button className="nav-btn">Sign up</button>
          </Link>
          <button>

            <HiShoppingCart />
          </button>
        </div>
      )}
      {userStatus && (
        <>
          <div onClick={fetchLoginData}>
            <img
              className="avatar-link"
              src={loginUser.avatar}
              alt="Your avatar"
            />
          </div>

          <div onClick={triggerLogout}>
            <button className="nav-btn">Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
