import React from "react";

export default function YourStory({ stories }) {
  console.log("YourStory component: ", stories);

  return (
    <div>
      {stories.map(story => (
        <div className="container border rounded my-3">{story.content}</div>
      ))}
    </div>
  );
}
