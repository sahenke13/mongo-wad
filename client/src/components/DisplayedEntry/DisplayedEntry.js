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
          currentEntry: res.data[0],
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

  newEntrySubmit = () => {
    API.saveEntry({
      storyId: null,
      content: this.state.newEntryContent,
      previousEntryId: this.state.currentEntry._id
    })
      .then(res => {
        console.log("new entry data", res.data);
        this.setState({
          currentEntry: res.data
        });
        let prevId = res.data.previousEntryId;
        let currentId = res.data._id;
        API.updateEntry(prevId, {
          idToPush: currentId
        });
      })

      .then(res => {
        console.log(
          "updated entry data (this is supposed to be undefined as we are not having mongo send us anything back in this case)",
          res
        );
      })

      .catch(err => console.log("this is an error", err));
    // pass thru previousEntryId as the one we're searching for here
  };

  render() {
    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>{this.state.storyInfo.title}</h3>
          id: {this.props.id}
          <p>{this.state.currentEntry.content}</p>
        </div>

        {/* {this.state.currentEntry.map(entry => {
          return (
            <div key={entry._id} className="container" id="nextEntries">
              {entry.content}
            </div>
          );
        })} */}

        <div
          key={this.state.currentEntry._id}
          className="container"
          id="nextEntries"
        />

        <NewEntryModal
          newEntryContent={this.state.newEntryContent}
          handleInputChange={this.handleInputChange}
          newEntrySubmit={this.newEntrySubmit}
        />
      </div>
    );
  }
}
