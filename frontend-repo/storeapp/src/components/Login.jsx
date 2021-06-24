import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import logIn from "../images/logIn.png";
import { addLoginData } from "../helpers/apiCall";
import { useHistory } from "react-router-dom";
import { myContext } from "../context/myContext";
import { loadUserCart, setUserInStorage } from "../helpers/localStorage";
import "../css/form.css";

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const context = useContext(myContext);
  const {
    loginUser,
    setloginUser,

    error,
    setError,
    updateCartState,
  } = context;
  console.log("login triggered!");
  const onSubmit = async (data) => {
    const newData = await addLoginData(data);
    console.log("NEWDATA", newData);

    if (newData.error) {
      setError(true);
      return;
    }
    setloginUser(newData.data);
    setUserInStorage(newData.data);
    const cartTols = loadUserCart(newData.data?._id); // i add the loginUser id to loadUserCart
    cartTols && updateCartState(cartTols);

    history.push("/store");
  };

  return (
    <div className="login-wrapper">
      <div className="login-text-wrapper">
        <h2>Welcome back!!</h2>
        <h3>Please fill in your credentials.</h3>
        {error && <h1 style={{ color: "red" }}>Login failed ! </h1>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="myForm"
          autoComplete="off"
        >
          <input
            type="email"
            name="email"
            ref={register({ required: true })}
            placeholder="Email"
          />

          <div className="error-message">
            {errors.email && <small>Please provide your email!</small>}
          </div>

          <input
            type="password"
            name="password"
            ref={register({ required: true })}
            placeholder="Password"
          />
          <div className="error-message">
            {errors.password && <small>Please provide your password!</small>}
          </div>

          <button className="login-btn">Log in</button>
          <p>You don’t have an account?</p>
          <div>
            <a
              onClick={() => history.push("/signup")}
              style={{ color: "blue ", cursor: "pointer" }}
            >
              Create New Account
            </a>
          </div>
        </form>
      </div>

      <div className="logo-img">
        <img className="login-img" src={logIn} alt={logIn} />
      </div>
    </div>
  );
};

export default Login;
