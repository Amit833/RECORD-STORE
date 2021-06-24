import React, { useContext } from "react";
import { myContext } from "../context/myContext";
import { useForm } from "react-hook-form";
import logIn from "../images/signUP.png";
import { useHistory } from "react-router-dom";
import { addSignupData } from "../helpers/apiCall";
import "../css/signup.css";
import { setUserInStorage } from "../helpers/localStorage";

const Signup = () => {
  const context = useContext(myContext);
  const { setError, setloginUser } = context;
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const user = await addSignupData(data);
    if (user.error) {
      setError(true);
      return;
    }

    setloginUser(user.data);
    setUserInStorage(user.data);
    history.push("/store");
  };
  console.log("signup loaded!");

  return (
    <>
      <div className="signup-wrapper">
        <div className="text-wrapper">
          <h2>Hurrraaaaay! Let us know who you are!</h2>
          <h3>We won’t share you info with anybody. I promise.</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="myForm"
            autoComplete="off"
          >
            <input
              id="firstName"
              type="text"
              name="firstName"
              ref={register({ required: true })}
              placeholder="First name"
              autoComplete="none"
            />
            <div className="error-message">
              {errors.firstName && (
                <small>Please provide your first name!</small>
              )}
            </div>

            <input
              id="lastName"
              type="text"
              name="lastName"
              ref={register({ required: true })}
              placeholder="Last name"
              autoComplete="none"
            />
            <div className="error-message">
              {errors.lastName && <small>Please provide your last name!</small>}
            </div>

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
              type="text"
              name="nickName"
              ref={register({ required: true })}
              placeholder="Nickname"
            />
            <div className="error-message">
              {errors.nickName && <small>Please provide your nickname!</small>}
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

            <input
              type="password"
              name="password"
              ref={register({ required: true })}
              placeholder="Repeat password"
            />
            <div className="error-message">
              {errors.email && <small>Please provide your password!</small>}
            </div>
            <button className="signup-btn">sign Up</button>
          </form>
        </div>

        <div className="logo-img">
          <img src={logIn} alt={logIn} />
        </div>
      </div>
    </>
  );
};

export default Signup;
