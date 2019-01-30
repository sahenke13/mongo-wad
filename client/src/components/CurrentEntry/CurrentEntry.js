import React from "react";

export default function CurrentEntry({ content, backButton }) {
  return (
    <div>
      <h3 className="text-center text-white">Current Entry</h3>
      <div className="container border bg-white rounded my-3">{content}</div>
      <button
        className="text-center btn text-white submitGuy"
        type="button"
        onClick={() => {
          backButton();
        }}
      >
        Go back
      </button>
    </div>
  );
}
