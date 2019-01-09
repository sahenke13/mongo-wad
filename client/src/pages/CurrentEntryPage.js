import React, { Component } from "react";
import DisplayEntry from "../components/DisplayedEntry";
import Entry from "../components/Entry";
import NavBar from "../components/NavBar";

export default class CurrentEntryPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <DisplayEntry />
      </div>
    );
  }
}
