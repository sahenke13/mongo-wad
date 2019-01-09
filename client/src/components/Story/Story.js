import React from "react";
import "./Story.css";

const StoryBody = ({ title, id, genre }) => {
  console.log("title :", title);
  console.log("id", id);
  console.log("genre is: ", genre);

  return (
    <div className="container" id="storyBody">
      <h4>Title: {title}</h4>
      <h3>genre: {genre}</h3>
    </div>
  );
};

export default StoryBody;
