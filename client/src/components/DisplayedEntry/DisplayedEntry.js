import React, { Component } from "react";
import "./DisplayEntry.css";
import NewEntryModal from "../NewEntry";
import API from "../../utils/API";
import YourStory from "../YourStory";

export default class DisplayedEntry extends Component {
  state = {
    yourStory: [],
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
        console.log("previousEntryId saved", res.data.previousEntryId);
        console.log("res.data: ", res.data);

        this.setState({
          currentEntry: res.data,
          newEntryContent: "",
          previousEntryId: res.data.previousEntryId,
          currentId: res.data._id
        });

        let prevId = res.data.previousEntryId;
        let currentEntry = res.data;

        API.updateEntry(prevId, {
          entryToPush: currentEntry
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

  updateCurrentEntry = id => {
    console.log("update current entry id: ", id);
    API.displayEntry(id)
      .then(res => {
        console.log("result object from displayEntry API call", res.data);
        let selectedSegment = res.data;
        let yourStoryArray = [...this.state.yourStory, selectedSegment];

        this.setState(
          () => {
            return {
              currentEntry: res.data,
              previousEntryId: res.data.previousEntryId,
              yourStory: yourStoryArray
            };
          },
          () => {
            console.log(
              "this is the state after updating current entry state",
              this.state
            );
            console.log("this is the yourStory Array: ", this.state.yourStory);
          }
        );
      })
      .catch(err => console.log("this is an error", err));
  };

  backButtonClicked = () => {
    let yourStoryArray = this.state.yourStory;
    yourStoryArray.pop();
    yourStoryArray.pop();

    this.setState(
      {
        yourStory: yourStoryArray,
        currentId: this.state.previousEntryId
      },
      () => this.updateCurrentEntry(this.state.previousEntryId)
    );
    console.log("after back button clicked....", this.state.currentId);
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
        <div className="row">
          {this.state.currentId === "" ? (
            <div className="col-lg-6 m-1">
              <h3 className="text-center">Starting Entries</h3>
              {this.state.firstEntriesArray.map(entry => (
                <div
                  className="border my-3 rounded p-2"
                  key={this.state.firstEntriesArray._id}
                  onClick={() => this.entryClicked(entry._id)}
                >
                  {entry.content}
                </div>
              ))}
            </div>
          ) : (
            <div className="col-lg-6 m-2">
              <h3 className="text-center">Current Entry</h3>
              <div className="container border rounded my-3">
                {this.state.currentEntry.content}
              </div>
              <button
                className="text-center btn btn-primary"
                type="button"
                onClick={() => {
                  this.backButtonClicked();
                  console.log("clicked back button");
                }}
              >
                Go back
              </button>
            </div>
          )}
          {/* add your story information below. Probably through a component that
           we pass props to. */}
          <div className="col-lg-5 m-2">
            <h3 className="text-center">YourStory</h3>
            <YourStory stories={this.state.yourStory} />
          </div>
          <div className="container">
            {/* does this.state.currentEntry.nextEntryArray exist? */}
            {this.state.currentEntry.nextEntryArray ? (
              // If yes:
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
              // If no:
              <div className="row my-2 text-center border">
                <div id="nextEntries" className="col-md-12 p-2 my-3">
                  <h1>No Next Entries</h1>
                </div>
              </div>
            )}
          </div>
        </div>

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
