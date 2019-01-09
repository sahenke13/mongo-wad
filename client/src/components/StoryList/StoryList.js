import React, { Component } from "react";
import API from "../../utils/API";

export default class StoryList extends Component {
  state = {
    stories: []
  };

  componentDidMount = () => {
    const storyList = [];
    API.getStories()
      .then(res => {
        console.log(res);
        return res.data.map(item => storyList.push(item));
      })
      .then(
        this.setState(
          {
            stories: storyList
          },
          () => console.log("stories: ", this.state.stories)
        )
      );
  };

  render() {
    return (
      <div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
          laboriosam rerum sint sapiente harum?
        </p>
      </div>
    );
  }
}
