import React, { Component } from "react";
import "./DisplayEntry.css";
import NewEntryModal from "../NewEntry";
import API from "../../utils/API";

export default class DisplayedEntry extends Component {
  state = {
    storyInfo: "",
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
        this.setState({ 
          storyInfo: res.data 
        }, () => {
          console.log("this is the storyInfo state", this.state.storyInfo);
      });
    })
      .catch(err => console.log("this is an error", err))
    
    API.displayRootEntry(id)
      .then(res => {
        this.setState({
          currentEntry: res.data
        }, () => {
          console.log("this is the currentEntry state", this.state.currentEntry)
        })
        
      })
  };

  newEntry = () => {

  }




  render() {
    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>{this.state.storyInfo.title}</h3>
          id: {this.props.id}
          <p>
            {this.state.currentEntry.map(entry => {
              return (
                entry.content
              )
            })}
            
          </p>
        </div>
        <div className="container" id="nextEntries">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          minima?
        </div>
         
        <NewEntryModal 
          newEntryContent={this.state.newEntryContent}
          handleInputChange={this.handleInputChange}
          newEntry={this.newEntry}
        />

      </div>
    );
  }
}
