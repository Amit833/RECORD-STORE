import React, { useEffect, useContext } from "react";
import { myContext } from "../context/myContext";
import { getRecordData, getOrderData } from "../helpers/apiCall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { setCartInStorage } from "../helpers/localStorage";
import "../css/recordStore.css";

export const RecordStore = () => {
  const { records, setRecords, cart, loginUser, updateCartState } =
    useContext(myContext);

  const fetchRecords = async () => {
    const myRecords = await getRecordData();
    const cartRecords = await getOrderData(loginUser._id);
    setRecords(myRecords);
    // setCart({ records: [], totalAmount: 0 });
    // setCartCounter(cartRecords.length);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const addTocart = (receivedRecord) => {
    const foundIndex = cart.records.findIndex(
      (record) => record.record._id === receivedRecord._id
    );

    if (foundIndex == -1) {
      cart.records.push({ record: receivedRecord, quantity: 1 });
    } else {
      cart.records[foundIndex]["quantity"]++;
    }

    const calculatePrice = (accumulator, currentValue) => {
      return accumulator + currentValue.quantity * currentValue.record.price;
    };

    cart.totalAmount = cart.records.reduce(calculatePrice, 0);
    updateCartState(cart);
    setCartInStorage(cart, loginUser._id);
  };

  return (
    <div className="store-wrapper">
      <section>
        <div className="record-container">
          <div className="image-wrapper">
            {records &&
              records.map((record) => {
                return (
                  <div className="record-info">
                    <img src={record.cover} />

                    <div className="price-btn">Price: ${record.price}</div>

                    <div className="plus-icon">
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => addTocart(record)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};
