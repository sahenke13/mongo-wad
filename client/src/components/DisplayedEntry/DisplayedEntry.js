import React, { Component } from "react";
import "./DisplayEntry.css";
import NewEntryModal from "../NewEntry";
import API from "../../utils/API";

export default class DisplayedEntry extends Component {
  state = {
    storyInfo: [],
    currentEntry: "",
    firstEntriesArray: [],
    previousEntryId: null,
    newEntryContent: "",
    currentId: ""
  };

  componentDidMount = () => {
    this.findStory(this.props.id);
    console.log("component did mount has fired");
    console.log("this is the initial state", this.state);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  // maybe do something like this but instead of passing id thru pass thru nextEntryArray in params??
  findStory = id => {
    API.getStory(id)
      .then(res => {
        this.setState(
          () => {
            return { storyInfo: res.data };
          },
          () => {
            console.log("this is the STORYINFO state", res.data);
          }
        );
      })
      .catch(err => console.log("this is an error", err));

    API.displayRootEntries(id).then(res => {
      console.log("display root res.data:  ", res.data);
      this.setState(
        {
          firstEntriesArray: res.data
        },
        () => {
          console.log(
            "this is the currentEntry state",
            this.state.currentEntry
          );
          console.log(
            "this is the firstEntriesArray state: ",
            this.state.firstEntriesArray
          );
        }
      );
    });
  };

  //I believe that previous entry Id is not right here.  It is always saving new entryies to the same first entry
  newEntrySubmit = () => {
    API.saveEntry({
      storyId: this.state.storyInfo._id,
      content: this.state.newEntryContent,
      previousEntryId: this.state.currentId ? this.state.currentId : null
    })
      .then(res => {
        console.log("new entry data", res.data);

        this.setState({
          currentEntry: res.data,
          newEntryContent: "",
          // nextEntryArray: res.data.nextEntryArray,
          previousEntryId: res.data.previousEntryId
        });

        let prevId = res.data.previousEntryId;
        let currentEntry = res.data;

        API.updateEntry(prevId, {
          entryToPush: currentEntry
        });

        this.setState({
          currentEntry: res.data,
          // nextEntryArray: res.data.nextEntryArray,
          previousEntryId: res.data.previousEntryId,
          newEntryContent: "",
          currentId: res.data._id
        });
      })
      .catch(err => console.log("this is an error", err));
  };

  entryClicked = id => {
    console.log("id :", id);
    this.setState({ currentId: id, firstEntriesArray: [] }, () =>
      this.updateCurrentEntry(id)
    );
  };

  //I believe displayEntry should be update Entry here
  updateCurrentEntry = id => {
    console.log("update current entry id: ", id);
    API.displayEntry(id)
      .then(res => {
        console.log("result object from displayEntry API call", res.data);
        this.setState(
          () => {
            return { currentEntry: res.data };
          },
          () => {
            console.log(
              "this is the state after updating current entry state",
              this.state
            );
          }
        );
      })
      .catch(err => console.log("this is an error", err));
  };

  render() {
    const { id } = this.props;
    const { title, genre, description } = this.state.storyInfo;

    return (
      <div className="container" id="displayContainer">
        <div className="row text-center my-2 p-2 border" id="storyHeader">
          <div className="col-md-12">
            <h3>{title}</h3>
            <h4>{genre}</h4>
            <h5>{description}</h5>
          </div>
        </div>

        {this.state.currentId === "" ? (
          <div className="container text-center">
            <h3>Starting Entries</h3>
            {this.state.firstEntriesArray.map(entry => (
              <div
                key={this.state.firstEntriesArray._id}
                onClick={() => this.entryClicked(entry._id)}
              >
                {entry.content}
              </div>
            ))}
          </div>
        ) : (
          <div key={this.state.currentEntry._id} className="container">
            <h3 className="text-center">Current Entry</h3>
            <div>{this.state.currentEntry.content}</div>
          </div>
        )}

        <h1 className="text-center my-3">Next Entries</h1>
        {this.state.currentEntry.nextEntryArray ? (
          this.state.currentEntry.nextEntryArray.map(entry => (
            <div className="row my-2 p-2 text-center border">
              <div
                key={entry._id}
                className="col-md-12"
                id="nextEntries"
                onClick={() => this.entryClicked(entry._id)}
              >
                {entry.content}
              </div>
            </div>
          ))
        ) : (
          <div className="row my-2 text-center border">
            <div id="nextEntries" className="col-md-12 p-2 my-3">
              <h1>No Next Entries</h1>
            </div>
          </div>
        )}

        <div className="row" id="btnGuy">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-primary my-2"
              data-toggle="modal"
              data-target="#entryModal"
            >
              New Entry
            </button>
          </div>
        </div>

        <NewEntryModal
          newEntryContent={this.state.newEntryContent}
          handleInputChange={this.handleInputChange}
          newEntrySubmit={this.newEntrySubmit}
        />
      </div>
    );
  }
}
