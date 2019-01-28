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
    this.setState({ currentId: id }, () => {
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
                entryClicked={id => this.entryClicked(id)}
              />
            </div>
          ) : (
            <div className="col-lg-6 m-2">
              <CurrentEntry
                content={currentEntry.content}
                backButton={this.backButtonClicked}
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
              nextEntryClicked={id => this.entryClicked(id)}
              currentId={currentId}
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
          newEntrySubmit={this.newEntrySubmit}
        />
      </div>
    );
  }
}
