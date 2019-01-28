import React from "react";

export default function StartingEntries({ firstEntriesArray, entryClicked }) {
  return (
    <div>
      <h3 className="text-center text-white">Starting Entries</h3>
      {firstEntriesArray.map(entry => (
        <div
          className="border pointerGuy my-3 bg-white rounded p-2"
          key={entry._id}
          onClick={() => entryClicked(entry._id)}
        >
          {entry.content}
        </div>
      ))}
    </div>
  );
}
