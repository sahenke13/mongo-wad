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
// maybe do something like this but instead of passing id thru pass thru nextEntryArray in params??
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

    // API.displayRootEntry(id).then(res => {
    //   console.log("display root res.data:  ", res.data);
    //   this.setState(
    //     {
    //       currentEntry: res.data[0]
    //     },
    //     () => {
    //       console.log(
    //         "this is the currentEntry state",
    //         this.state.currentEntry
    //       );
    //       console.log(
    //         "this is the nextEntryArray: ",
    //         this.state.nextEntryArray
    //       );
    //     }
    //   );
    // });
  };

  //I believe that previous entry Id is not right here.  It is always saving new entryies to the same first entry
  newEntry = () => {
    API.saveEntry({
      storyId: null,
      content: this.state.newEntryContent,
      previousEntryId: this.state.currentId
    })
      .then(res => {
        console.log("new entry data", res.data);
        
        this.setState({
          currentEntry: res.data,
          newEntryContent: "",
          nextEntryArray: res.data.nextEntryArray,
          previousEntryId: res.data.previousEntryId
        });
        
        let prevId = res.data.previousEntryId;
        let currentId = res.data._id
        
        API.updateEntry(prevId, {
          idToPush: currentId
        })
        
        this.setState({
          currentEntry: res.data,
          // nextEntryArray: res.data.nextEntryArray,
          previousEntryId: res.data.previousEntryId,
          newEntryContent: "",
          currentId: res.data._id
        })

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
    const { title, genre, description} = this.state.storyInfo
    
    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>{title}</h3>
          StoryId: {id}
          <h4>{genre}</h4>
          <h5>{description}</h5>
        </div>
      
      <div className="container">
        <h1>{this.state.currentEntry.content}</h1>
      </div>
      

        {this.state.currentEntry.nextEntryArray ? (
          this.state.currentEntry.nextEntryArray.map(entry => (
            <div
              key={entry._id}
              className="container my-3 rounded border border-primary"
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
          newEntrySubmit={this.newEntrySubmit}
        />
      </div>
    );
  }
}
