import React, { Component } from "react";
import DisplayEntry from "../components/DisplayedEntry";
// import Entry from "../components/Entry";

export default class CurrentEntryPage extends Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <div>
        <DisplayEntry id={id} />
      </div>
    );
  }
}
