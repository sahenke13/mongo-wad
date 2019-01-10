import React from "react";
import "./MainPageBody.css";
import img from "./wordwadinvert-f.png";

const MainPageBody = () => {
  return (
    <div className="jumbotron" id="mainPageBody">
      <div className="container">
        <img
          src={img}
          alt="WordWadLogo"
          className="img-fluid"
          id="mainWordWadLogo"
        />
      </div>
    </div>
  );
};

export default MainPageBody;
