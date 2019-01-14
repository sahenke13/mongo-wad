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
// maybe do something like this but instead of passing id thru pass thru nextEntryArray in params??
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

    API.displayRootEntry(id)
      .then(res => {
        console.log("next entry array: ", res.data[0].nextEntryArray);
      
        this.setState(
          {
          currentEntry: res.data[0]
          }
        );
        let nextEntryId = this.state.currentEntry.nextEntryArray
          console.log(nextEntryId)
       
        API.displayNextEntries(nextEntryId)
        .then(res => {
          this.setState({
            nextEntryArray: res.data
          });
          console.log(this.state.nextEntryArray)
        })
        
      })
      .catch(err => console.log("this be an error", err))

      
    }

  newEntrySubmit = () => {
    
    API.saveEntry({
      storyId: null,
      content: this.state.newEntryContent,
      previousEntryId: this.state.currentEntry._id
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
        });
      })

          .then(res => {
            console.log("this is supposed to be undefined", res);
      })
      
      .catch(err => console.log("this is an error", err));
    
  };

  render() {
    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>{this.state.storyInfo.title}</h3>
          id: {this.props.id}

          <p>{this.state.currentEntry.content}</p>
        </div>


        
        {this.state.nextEntryArray.map(entry => {
          return (
            <div key={entry._id} className="container" id="nextEntries">
              {entry.content}
            </div>
          );
        })}

        <NewEntryModal
          newEntryContent={this.state.newEntryContent}
          handleInputChange={this.handleInputChange}
          newEntrySubmit={this.newEntrySubmit}
        />
      </div>
    );
  }
}
