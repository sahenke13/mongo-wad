import React, { Component } from "react";
import API from "../utils/API";

export default class CreateStory extends Component {
  state = {
    title: "",
    genre: "",
    textGuy: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleStorySubmit = event => {
    event.preventDefault();
    API.saveStory({
      title: this.state.title,
      genre: this.state.genre
    })
      // After creating the story, we use the promise to save the newly created StoryId to the State. We Can then use that to save along with Entry text.
      .then(dataGuy => {
        let storyId = dataGuy.data._id;
        API.saveEntry({
          storyId: storyId,
          content: this.state.textGuy,
          previousEntryId: null
        });
      });

      

  };

  render() {
    return (
      <div>
        <br />
        <div className="container" id="storyform">
          <h1>Let's Create a Story</h1>
          <div className="row">
            <div className="col-md-12">
              <form className="form">
                {/* Title Entry */}
                <input
                  value={this.state.title}
                  type="text"
                  name="title"
                  onChange={this.handleInputChange}
                  className="form-control spacing"
                  placeholder="Give your Story a name"
                />
                {/* Genre Entry */}
                <input
                  value={this.state.genre}
                  type="text"
                  name="genre"
                  onChange={this.handleInputChange}
                  className="form-control spacing"
                  placeholder="Decide on the genre"
                />
                {/* Root Entry */}
                <textarea
                  value={this.state.textGuy}
                  type="text"
                  name="textGuy"
                  rows="10"
                  onChange={this.handleInputChange}
                  className="form-control spacing"
                  placeholder="Start your story here"
                />
                {/* Submit button */}
                <button onClick={this.handleStorySubmit}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
