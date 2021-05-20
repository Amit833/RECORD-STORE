import { createContext, useState, useEffect } from "react";
import { authenticateUser } from "../helpers/apiCall";
import { loadUserFromStorage } from "../helpers/localStorage";

export const myContext = createContext();

export const UserContextProvider = (props) => {
  const [signup, setSignup] = useState([]);
  const [loginUser, setloginUser] = useState(loadUserFromStorage());
  const [records, setRecords] = useState([]);

  const [userStatus, setUserStatus] = useState(false);
  const [error, setError] = useState(false);
  const [updateUser, setUpdateUser] = useState([]);

  const [authIsDone, setAuthIsDone] = useState(false);

  const [cart, setCart] = useState({ records: [], totalPrice: 0 });
  const [orders, setOrders] = useState([]);
  const [cartCounter, setCartCounter] = useState();
  const [totalQuantity, setTotalQuantity] = useState();

  //last thing to get executed (after all components have been rendered already)
  useEffect(() => {
    console.log("Context is trying to authenticate the user");
    const authMe = async () => {
      try {
        // /me
        const result = await authenticateUser();
        console.log("result", result);
        if (result.error) {
          setloginUser();
          setAuthIsDone(true);
          setUserStatus(false);
          return;
        }

        // setloginUser(result);
        setAuthIsDone(true);
        setUserStatus(true);
      } catch (error) {}
    };

    authMe();
  }, []); // will executed AFTER first render

  return (
    <myContext.Provider
      value={{
        signup,
        setSignup,
        loginUser,
        setloginUser,
        updateUser,
        setUpdateUser,
        userStatus,
        setUserStatus,
        error,
        setError,
        authIsDone,
        setAuthIsDone,
        cart,
        setCart,
        records,
        setRecords,
        orders,
        setOrders,
        cartCounter,
        setCartCounter,
        totalQuantity,
        setTotalQuantity,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};
