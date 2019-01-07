import React from "react";
import Header from "../components/NavBar/Header";
import StoryBody from "../components/StoryBody";

class StoryPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <StoryBody />
      </div>
    );
  }
}

export default StoryPage;
