import React, { useContext } from "react";
import { myContext } from "../context/myContext";
import { useParams, useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../helpers/apiCall"
import { clearUserInStorage, setUserInStorage } from "../helpers/localStorage"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import "../css/nav.css";


const Nav = () => {
  const context = useContext(myContext);
  const { userStatus, loginUser, setloginUser, setUserStatus, cartCounter, totalQuantity } = context;
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




          <NavLink activeClassName='selected' exact to='/cart'>
            {totalQuantity && (

              <div className='cnt' data-content={totalQuantity}>
                {/* <p>{totalQuantity}</p> */}
              </div>
            )}
            <FontAwesomeIcon icon={faShoppingCart} />
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Nav;
