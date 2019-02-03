import React, { Component } from "react";
import "./DisplayEntry.css";
import NewEntryModal from "../NewEntry";
import API from "../../utils/API";
import YourStory from "../YourStory";
import StoryHeader from "../StoryHeader";
import StartingEntries from "../StartingEntries";
import CurrentEntry from "../CurrentEntry";
import NextEntryArray from "../NextEntryArray";

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
    this.handleFindStory(this.props.id);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  // maybe do something like this but instead of passing id thru pass thru nextEntryArray in params??
  handleFindStory = id => {
    API.getStory(id)
      .then(res => {
        this.setState(() => {
          return { storyInfo: res.data };
        });
      })
      .catch(err => console.log("this is an error", err));

    API.displayRootEntries(id).then(res => {
      this.setState({
        firstEntriesArray: res.data
      });
    });
  };

  //need to set voteCount to 0?? grab votes??
  handleNewEntrySubmit = () => {
    let EntryId = this.state.currentId ? this.state.currentId : null;
    API.saveEntry({
      storyId: this.state.storyInfo._id,
      content: this.state.newEntryContent,
      previousEntryId: EntryId
    })
      .then(res => {
        let prevId = res.data.previousEntryId;
        let curEntry = res.data;

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

  handleEntryClicked = id => {
    this.setState({ currentId: id }, () => {
      this.handleUpdateCurrentEntry(id);
    });
  };

  handleUpdateCurrentEntry = id => {
    API.displayEntry(id)
      .then(res => {
        let selectedSegment = res.data;
        let yourStoryArray = [...this.state.yourStory, selectedSegment];

        this.setState(() => {
          return {
            currentEntry: res.data,
            previousEntryId: res.data.previousEntryId,
            yourStory: yourStoryArray
          };
        });
      })
      .catch(err => console.log("this is an error", err));
  };
  handleBackButtonUpdateCurrentEntry = id => {
    let yourStoryArray = [...this.state.yourStory];
    API.displayEntry(id).then(res => {
      let item = res.data;
      this.setState({
        currentEntry: item,
        previousEntryId: item.previousEntryId,
        yourStory: yourStoryArray
      });
    });
  };

  handleBackButtonClicked = () => {
    let yourStoryArray = this.state.yourStory;
    yourStoryArray.pop();

    yourStoryArray.length === 0
      ? this.setState(
          {
            currentId: "",
            nextEntryArray: [],
            currentEntry: ""
          },
          () => {
            this.handleFindStory(this.props.id);
          }
        )
      : this.setState(
          {
            yourStory: yourStoryArray,
            currentId: this.state.previousEntryId
          },

          () => {
            this.handleBackButtonUpdateCurrentEntry(this.state.previousEntryId);
          }
        );
  };

  handleUpVote = () => {
    console.log("Up Vote Clicked");
  };
  handleDownVote = () => {
    console.log("Down Vote Clicked");
  };

  render() {
    const { title, genre, description } = this.state.storyInfo;
    const {
      firstEntriesArray,
      currentEntry,
      yourStory,
      currentId
    } = this.state;

    return (
      <div className="container" id="displayContainer">
        {/* <StoryHeader title={title} genre={genre} description={description} /> */}
        <StoryHeader title={title} genre={genre} description={description} />
        <div className="row">
          {this.state.currentId === "" ? (
            <div className="col-lg-6 m-1">
              <StartingEntries
                firstEntriesArray={firstEntriesArray}
                entryClicked={id => this.handleEntryClicked(id)}
              />
            </div>
          ) : (
            <div className="col-lg-6 m-2">
              <CurrentEntry
                content={currentEntry.content}
                backButton={this.handleBackButtonClicked}
              />
            </div>
          )}
          {/* add your story information below. Probably through a component that
           we pass props to. */}
          <div className="col-lg-5 m-2">
            <YourStory stories={yourStory} />
          </div>
          <div className="container">
            {/* does this.state.currentEntry.nextEntryArray exist? */}
            <NextEntryArray
              nextEntryArray={currentEntry.nextEntryArray}
              nextEntryClicked={id => this.handleEntryClicked(id)}
              currentId={currentId}
              upVote={this.handleUpVote}
              downVote={this.handleDownVote}
            />
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
          newEntrySubmit={this.handleNewEntrySubmit}
        />
      </div>
    );
  }
}
