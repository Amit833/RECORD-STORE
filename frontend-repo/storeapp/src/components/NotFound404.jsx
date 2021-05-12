import React from "react";
import { NavLink } from "react-router-dom";
import "../css/404.css";

const NotFound404 = (props) => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>
        <h2>Page not found</h2>
      </p>
      <h3>
        We're sorry, the page you requested could not be found. Please go back
        to the homepage.
      </h3>
      <NavLink to="/">
        <button className="not-found-btn" onClick={() => props.history.push}>
          Get me out
        </button>
      </NavLink>
    </div>
  );
};

export default NotFound404;
