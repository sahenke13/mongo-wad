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
    newEntryContent: "",
    currentId: ""
  };

  componentDidMount = () => {
    this.findStory(this.props.id);
    console.log("component did mount has fired");
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
          () => {
            return { storyInfo: res.data };
          },
          () => {
            console.log("this is the storyInfo state", res.data);
          }
        );
      })
      .catch(err => console.log("this is an error", err));

    API.displayRootEntry(id).then(res => {
      console.log("display root res.data:  ", res.data);
      this.setState(
        {
          currentEntry: res.data,
          nextEntryArray: res.data
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
        console.log("updated entry data", res.data);
      })

      .catch(err => console.log("this is an error", err));
    // pass thru previousEntryId as the one we're searching for here
  };

  entryClicked = id => {
    console.log("id :", id);
    this.setState({ currentId: id }, () => this.updateCurrentEntry(id));
  };

  updateCurrentEntry = id => {
    console.log("update current entry id: ", id);
    API.displayEntry(id)
      .then(res => {
        console.log(res.data);
        this.setState(
          () => {
            return { nextEntryArray: res.data };
          },
          () => {
            console.log(
              "this is the nextEntry Array state",
              this.state.nextEntryArray
            );
          }
        );
      })
      .catch(err => console.log("this is an error", err));
  };

  render() {
    const { id } = this.props;

    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>{this.state.storyInfo.title}</h3>
          id: {id}
          {/* <p>{this.state.currentEntry[0].content}</p> */}
        </div>

        {this.state.nextEntryArray ? (
          this.state.nextEntryArray.map(entry => (
            <div
              key={entry._id}
              className="container my-3 rounded"
              id="nextEntries"
              onClick={() => this.entryClicked(entry._id)}
            >
              {entry.content}
            </div>
          ))
        ) : (
          <div className="container p-2 my-3">
            <h1>No Next Entries</h1>
          </div>
        )}

        {/* {this.state.currentEntry.map(entry => {
          return (
            <div
              key={entry._id}
              className="container my-3 rounded border border-primary"
              id="nextEntries"
              onClick={() => this.entryClicked(entry._id)}
            >
              {entry.content}
            </div>
          );
        })} */}

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
