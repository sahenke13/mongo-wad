import React from "react";
import "./StoryHeader.css";

export default function StoryHeader({ title, genre, description }) {
  return (
    <div>
      <div
        className="row text-center bg-white my-2 p-2 border"
        id="storyHeader"
      >
        <div className="col-md-12">
          <h3>{title}</h3>
          <h4>{genre}</h4>
          <h5>{description}</h5>
        </div>
      </div>
    </div>
  );
}
