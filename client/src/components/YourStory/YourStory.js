import React from "react";

export default function YourStory({ stories }) {
  console.log("YourStory component: ", stories);

  return (
    <div>
      <h3 className="text-center text-white">YourStory</h3>
      {stories.map(story => (
        <div className="container border bg-white rounded my-3">
          {story.content}
        </div>
      ))}
    </div>
  );
}
