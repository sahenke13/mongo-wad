import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../utils/API";

class CreateStory extends Component {
  state = {
    title: "",
    genre: "",
    description: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRedirect = () => {
    this.props.history.push("/browseStories");
  };
  handleStorySubmit = event => {
    event.preventDefault();
    API.saveStory({
      title: this.state.title,
      genre: this.state.genre,
      description: this.state.description
    })
      // After creating the story, we use the promise to save the newly created StoryId to the State. We Can then use that to save along with Entry text.
      .then(resObj => {
        console.log(resObj);

        this.setState(
          {
            title: "",
            genre: "",
            description: ""
          },
          () => this.handleRedirect()
        );
      });
  };

  render() {
    const { title, genre, description } = this.state;

    return (
      <div>
        <br />
        <div className="container text-center" id="storyform">
          <div className="my-2">
            <h1 className="text-white">Let's Create a Story</h1>
          </div>

          <form className="form">
            {/* Title Entry */}
            <input
              value={title}
              type="text"
              name="title"
              onChange={this.handleInputChange}
              className="form-control mt-4"
              placeholder="Give your Story a name"
            />
            {/* Genre Entry */}
            <input
              value={genre}
              type="text"
              name="genre"
              onChange={this.handleInputChange}
              className="form-control my-2"
              placeholder="Decide on the genre"
            />
            {/* Root Entry */}
            <textarea
              value={description}
              type="text"
              name="description"
              rows="10"
              onChange={this.handleInputChange}
              className="form-control my-2"
              placeholder="Write a description so everyone knows what your story is about!"
            />
            {/* Submit button */}
            <button
              className="btn submitGuy text-white"
              onClick={this.handleStorySubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateStory);
