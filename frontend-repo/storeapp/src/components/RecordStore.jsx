import React, { useEffect, useState, useContext } from "react";
import { myContext } from "../context/myContext";
import { getRecordData } from "../helpers/apiCall";
import { useParams, useHistory, Link } from "react-router-dom";
import { updateUserProfile } from "../helpers/apiCall";
import "../css/recordStore.css";

export const RecordStore = () => {
  const history = useHistory();
  let { id } = useParams();

  const context = useContext(myContext);
  const { loginUser, setloginUser } = context;
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    const myRecords = await getRecordData();
    console.log("myRecords", myRecords);
    setRecords(myRecords);
  };

  useEffect(() => {
    fetchRecords();
  }, []);



  return (



    <div className="store-wrapper">
      <section>

        <div className="record-container">
          <div className="image-wrapper">
            {records &&
              records.map((record) => {

                return <img src={record.cover} onClick={() => alert("hi")} />;

              })}
          </div>
        </div>
      </section>
    </div>
  );
};
