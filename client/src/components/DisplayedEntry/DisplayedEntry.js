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
    currentId: "",
    newEntryContent: ""
  };

  componentDidMount = () => {
    this.findStory(this.props.id);
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

  //NewEntrySubmit is for some reason pushing the new Entry twice into previousEntryArray.  Why???
  newEntrySubmit = () => {
    let EntryId = this.state.currentId ? this.state.currentId : null;
    API.saveEntry({
      storyId: this.state.storyInfo._id,
      content: this.state.newEntryContent,
      previousEntryId: EntryId
    })
      .then(res => {
        console.log("res.data: ", res.data);
        console.log("res.data.currentEntry :", res.data.currentEntry);
        let prevId = res.data.previousEntryId;
        let curEntry = res.data;

        console.log("curEntry: ", curEntry);

        API.updateEntry(prevId, {
          entryToPush: curEntry
        });
        // let item = res.data;
        let yourStoryArray = [...this.state.yourStory, curEntry];

        this.setState({
          currentEntry: res.data,
          previousEntryId: res.data.previousEntryId,
          currentId: res.data._id,
          yourStory: yourStoryArray,
          newEntryContent: ""
        });
      })
      .catch(err => console.log("this is an error", err));
  };

  entryClicked = id => {
    console.log("id :", id);
    this.setState({ previousEntryArray: [], currentId: id }, () => {
      this.updateCurrentEntry(id);
      console.log(id);
    });
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
  backButtonUpdateCurrentEntry = id => {
    let yourStoryArray = [...this.state.yourStory];
    API.displayEntry(id).then(res => {
      let item = res.data;
      console.log("back button item: ", item);
      this.setState({
        currentEntry: item,
        previousEntryId: item.previousEntryId,
        yourStory: yourStoryArray
      });
    });
  };

  backButtonClicked = () => {
    let yourStoryArray = this.state.yourStory;
    yourStoryArray.pop();
    console.log("yourStroyArray is: ", yourStoryArray);
    yourStoryArray.length === 0
      ? this.setState(
          {
            currentId: "",
            nextEntryArray: [],
            currentEntry: ""
          },
          () => {
            this.findStory(this.props.id);
          }
        )
      : this.setState(
          {
            yourStory: yourStoryArray,
            currentId: this.state.previousEntryId
          },

          () => {
            this.backButtonUpdateCurrentEntry(this.state.previousEntryId);
          }
        );
    console.log("after back button clicked....", this.state.currentId);
  };

  render() {
    const { id } = this.props;
    const { title, genre, description } = this.state.storyInfo;

    return (
      <div className="container" id="displayContainer">
        <div className="row text-center bg-white my-2 p-2 border" id="storyHeader">
          <div className="col-md-12">
            <h3>{title}</h3>
            <h4>{genre}</h4>
            <h5>{description}</h5>
          </div>
        </div>
        <div className="row">
          {this.state.currentId === "" ? (
            <div className="col-lg-6 m-1">
              <h3 className="text-center text-white">Starting Entries</h3>
              {this.state.firstEntriesArray.map(entry => (
                <div
                  className="border my-3 bg-white rounded p-2"
                  key={this.state.firstEntriesArray._id}
                  onClick={() => this.entryClicked(entry._id)}
                >
                  {entry.content}
                </div>
              ))}
            </div>
          ) : (
            <div className="col-lg-6 m-2">
              <h3 className="text-center text-white">Current Entry</h3>
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
            <h3 className="text-center text-white">YourStory</h3>
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
              <div className="row my-2 text-center border bg-white">
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
              className="btn text-white submitGuy my-2"
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
