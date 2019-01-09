import React, { Component } from "react";
import API from "../../utils/API";
import Story from "../Story";
import "./StoryList.css";

export default class StoryList extends Component {
  state = {
    stories: []
  };

  componentDidMount() {
    this.loadStories();
  }

  loadStories = () => {
    API.getStories()
      .then(res => {
        this.setState({ stories: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state);
    console.log("this.state.stories : ", this.state.stories);

    return (
      <div className="container" id="story">
        <h4>This is the Story List component</h4>
        <div className="storyContainer">
          story container here
          {this.state.stories.length ? (
            this.state.stories.map(story => {
              return (
                <Story
                  key={story._id}
                  title={story.title}
                  id={story._id}
                  genre={story.genre}
                />
              );
            })
          ) : (
            <h1>No current Stories to show</h1>
          )}
        </div>
      </div>
    );
  }
}
