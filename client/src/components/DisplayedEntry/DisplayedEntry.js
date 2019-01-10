import React, { Component } from "react";
import "./DisplayEntry.css";
import NextEntry from "../Entry";
import API from "../../utils/API";

export default class DisplayedEntry extends Component {
  state = {
    storyInfo: [],
    currentEntry: 0,
    NextEntry: null
  };

  componentDidMount = () => {
    this.findStory(this.props.id);
  };
  findStory = id => {
    API.getStory(id).then(res => {
      this.setState({ storyInfo: res.data }, () => {
        console.log(this.state.storyInfo);
      });
      console.log(res.data);
    });
  };

  render() {
    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>{this.state.storyInfo.title}</h3>
          id: {this.props.id}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            adipisci maxime tempora reprehenderit amet veniam a esse vero
            maiores ipsa modi, impedit aperiam earum dolore doloremque neque
            expedita delectus magnam?
          </p>
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
