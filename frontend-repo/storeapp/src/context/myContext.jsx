import { createContext, useState, useEffect } from "react";
import { authenticateUser } from "../helpers/apiCall";
import { loadUserFromStorage, loadUserCart } from "../helpers/localStorage";

export const myContext = createContext();

export const UserContextProvider = (props) => {
  const [loginUser, setloginUser] = useState(loadUserFromStorage()); // when I logout I should clear the localstroge
  const [records, setRecords] = useState([]);

  const [error, setError] = useState(false);
  const [authIsDone, setAuthIsDone] = useState(false);

  const cartls = loginUser && loadUserCart(loginUser._id);

  const [cart, setCart] = useState(
    cartls ? cartls : { records: [], totalAmount: 0 }
  );

  const [orders, setOrders] = useState([]);

  const [cartCounter, setCartCounter] = useState(
    cartls ? cartls.records.length : ""
  );

  const totalQty = cartls?.records.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const [totalQuantity, setTotalQuantity] = useState(totalQty);

  const updateCartState = (cart) => {
    setCart(cart);

    setCartCounter(cart.records.length);

    const totalQty = cart.records.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(totalQty);
  };

  //last thing to get executed (after all components have been rendered already)
  useEffect(() => {
    const authMe = async () => {
      try {
        // /me
        const result = await authenticateUser();
        if (result.error) {
          setloginUser(null);
          setAuthIsDone(true);
          return;
        }

        // setloginUser(result);
        setAuthIsDone(true);
      } catch (error) {}
    };

    authMe();
  }, []); // will executed AFTER first render

  return (
    <myContext.Provider
      value={{
        loginUser,
        setloginUser,

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
        updateCartState,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};
