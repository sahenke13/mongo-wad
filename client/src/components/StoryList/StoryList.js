import React, { Component } from "react";
import API from "../../utils/API";
import Story from "../Story";
import "./StoryList.css";
import { Link } from "react-router-dom";

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
    return (
      <div className="container" id="story">
        <div className="storyContainer">
          {this.state.stories.length ? (
            this.state.stories.map(story => {
              return (
                <Link to={`/currentEntry/${story._id}`} key={story._id}>
                  <Story
                    key={story._id}
                    title={story.title}
                    id={story._id}
                    genre={story.genre}
                  />
                </Link>
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
