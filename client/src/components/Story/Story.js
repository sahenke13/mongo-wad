import React from "react";
import "./Story.css";

// This is the story component that displays on StoryList

const Story = ({ title, id, genre }) => {
  console.log("title :", title);
  console.log("id", id);
  console.log("genre is: ", genre);

  return (
    <div className="card" id="storyBody">
      <div className="card-boby">
        <h4 className="card-title">{title}</h4>
        <h6>genre: {genre}</h6>
      </div>
    </div>
  );
};

export default Story;
