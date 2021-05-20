import React, { useEffect, useState, useContext } from "react";
import { myContext } from "../context/myContext";
import { getRecordData } from "../helpers/apiCall";
import { useParams, useHistory, Link } from "react-router-dom";
import { updateUserProfile } from "../helpers/apiCall";
import "../css/recordStore.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const RecordStore = () => {
  // const history = useHistory();
  // let { id } = useParams();

  const { records, setRecords, cart, setCart, setCartCounter, setTotalQuantity } = useContext(myContext);



  const fetchRecords = async () => {
    const myRecords = await getRecordData();

    setRecords(myRecords);
  };

  useEffect(() => {
    fetchRecords();
  }, []);


  const addTocart = (receivedRecord) => {

    let pr = cart;
    // Is the record already in the cart?
    const foundIndex = cart.records.findIndex((record) => record.record._id === receivedRecord._id);

    if (foundIndex == -1) {
      // console.log('Record was not the cart');
      pr.records.push({ record: receivedRecord, quantity: 1 });
    } else {

      pr.records[foundIndex]['quantity']++;
    }

    setCart(pr);
    setCartCounter(cart.records.length);


    const totalQty = cart.records.reduce((acc, item) => acc + item.quantity, 0)
    setTotalQuantity(totalQty)



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
                    <div className="plus-icon">

                      <FontAwesomeIcon icon={faPlus} onClick={() => addTocart(record)} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div >
  );
};
