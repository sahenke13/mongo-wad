import React, { Component } from "react";
import "./DisplayEntry.css";
import NextEntry from "../Entry";

export default class DisplayedEntry extends Component {
  state = {
    currentEntry: 0,
    NextEntry: null
  };
  render() {
    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>Current Entry</h3>
          This is were I am going to place the current Entry Information.
        </div>
        <div className="container" id="nextEntries">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          minima?
        </div>
        <button type="button" className="btn btn-success">
          Create New Entry
        </button>
        <NextEntry />
      </div>
    );
  }
}
