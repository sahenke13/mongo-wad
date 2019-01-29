import React from "react";

export default function YourStory({ stories }) {
  return (
    <div>
      <h3 className="text-center text-white">YourStory</h3>
      {stories.map(story => (
        <div key={story._id} className="container border bg-white rounded my-3">
          {story.content}
        </div>
      ))}
    </div>
  );
}
