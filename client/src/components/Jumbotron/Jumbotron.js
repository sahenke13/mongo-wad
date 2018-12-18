import React from "react";
import "./Jumbotron.css"
// import { PromiseProvider } from "mongoose";


const Jumbotron = ({children})=>(
<div className="jumbotron" id = "jumbo">
  <h1 className="display-4">React Book Search</h1>
  <p>A React App created by Steven Henke</p>
  {children}
</div>
);

export default Jumbotron;