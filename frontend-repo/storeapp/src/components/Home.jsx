import React from "react";
import HomeImg from "../images/Home.png";
import "../css/home.css";

const Home = (props) => {
  return (
    <div>
      <div className="home-wrapper">
        <img className="background" src={HomeImg} alt={HomeImg} />
      </div>
    </div>
  );
};

export default Home;
