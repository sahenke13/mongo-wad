import React, { Component } from "react";
import "./DisplayEntry.css";
import NewEntryModal from "../NewEntry";
import API from "../../utils/API";

export default class DisplayedEntry extends Component {
  state = {
    storyInfo: [],
    currentEntry: [],
    // nextEntryArray: [],
    previousEntryId: "",
    newEntryContent: "",
    currentId: ""
  };

  componentDidMount = () => {
    this.findStory(this.props.id);
    console.log("component did mount has fired");
    console.log("this is the state SHAPE for reference (on mount)", this.state)
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
          currentEntry: res.data
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

  //I believe that previous entry Id is not right here.  It is always saving new entryies to the same first entry
  newEntrySubmit = () => {
    API.saveEntry({
      storyId: this.state.storyInfo._id,
      content: this.state.newEntryContent,
      previousEntryId: this.state.currentId
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
        let currentId = res.data._id;

        API.updateEntry(prevId, {
          idToPush: currentId
        });

        this.setState({
          currentEntry: res.data,
          // nextEntryArray: res.data.nextEntryArray,
          previousEntryId: res.data.previousEntryId,
          newEntryContent: "",
          currentId: res.data._id
        });
      })

      .then(res => {
        console.log("updated entry data", res.data);
      })

      .catch(err => console.log("this is an error", err));
  };

  entryClicked = id => {
    console.log("id :", id);
    this.setState({ currentId: id }, () => this.updateCurrentEntry(id));
  };

  //I believe displayEntry should be update Entry here
  updateCurrentEntry = id => {
    console.log("update current entry id: ", id);
    API.displayEntry(id)
      .then(res => {
        console.log(res.data);
        this.setState(
          () => {
            return { currentEntry: res.data };
          },
          () => {
            console.log(
              "this is the currentEntry state",
              this.state.currentEntry
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
            StoryId: {id}
            <h4>{genre}</h4>
            <h5>{description}</h5>
          </div>
        </div>
        <div className="row text-center my-2 p-1 border" id="currentEntry">
          <div className="col-md-12">
            {this.state.currentEntry.content ? (
              <h1>{this.state.currentEntry.content}</h1>
            ) : (
              <h1>No entry to display.... yet</h1>
            )}
          </div>
        </div>

        {this.state.currentEntry.nextEntryArray ? (
          this.state.currentEntry.nextEntryArray.map(entry => (
            <div className="row my-2 p-2 text-center border">
              <div
                key={entry._id}
                className="col-md-12 my-3 rounded border border-primary"
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
