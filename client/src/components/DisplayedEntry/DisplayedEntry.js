import React, { Component } from "react";
import "./DisplayEntry.css";
import NewEntryModal from "../NewEntry";
import API from "../../utils/API";

export default class DisplayedEntry extends Component {
  state = {
    storyInfo: [],
    currentEntry: [],
    nextEntryArray: [],
    previousEntryId: "",
    newEntryContent: ""
  };

  componentDidMount = () => {
    this.findStory(this.props.id);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  findStory = id => {
    API.getStory(id)
      .then(res => {
        this.setState(
          {
            storyInfo: res.data
          },
          () => {
            console.log("this is the storyInfo state", this.state.storyInfo);
          }
        );
      })
      .catch(err => console.log("this is an error", err));

    API.displayRootEntry(id).then(res => {
      console.log("next entry array: ", res.data[0].nextEntryArray);
      this.setState(
        {
          currentEntry: res.data,
          nextEntryArray: res.data[0].nextEntryArray
        },
        () => {
          console.log(
            "this is the currentEntry state",
            this.state.currentEntry
          );
          console.log(
            "this is the nextEntryArray: ",
            this.state.nextEntryArray
          );
        }
      );
    });
  };

  newEntry = () => {
    API.saveEntry({
      storyId: this.state.storyInfo._id,
      content: this.state.newEntryContent,
      previousEntryId: this.state.currentEntry[0]._id
    })
      .then(res => {
        console.log("new entry data", res.data);
        let prevId = res.data.previousEntryId;
        let currentId = res.data._id;
        API.updateEntry(prevId, {
          idToPush: currentId
        });
      })

      .then(res => {
        console.log("updated entry data", res);
      })

      .catch(err => console.log("this is an error", err));
    // pass thru previousEntryId as the one we're searching for here
  };

  entryClicked = () => {
    console.log("entry has been clicked");
  };

  render() {
    const { id } = this.props;
    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>{this.state.storyInfo.title}</h3>
          id: {id}
          {/* <p>{this.state.currentEntry}</p> */}
        </div>

        {this.state.currentEntry.map(entry => {
          return (
            <div
              key={entry._id}
              className="container my-3 rounded"
              id="nextEntries"
              onClick={this.entryClicked}
            >
              {entry.content}
            </div>
          );
        })}

        <button
          type="button"
          className="btn btn-primary my-2"
          data-toggle="modal"
          data-target="#entryModal"
        >
          Create New Entry
        </button>

        <NewEntryModal
          newEntryContent={this.state.newEntryContent}
          handleInputChange={this.handleInputChange}
          newEntry={this.newEntry}
        />
      </div>
    );
  }
}
