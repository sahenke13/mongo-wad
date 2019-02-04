import React from "react";
import EntryComp from "../EntryComp";

export default function NextEntryArray({
  nextEntryArray,
  nextEntryClicked
  // upVote,
  // downVote
}) {
  return (
    <div>
      {nextEntryArray ? (
        // If yes:

        nextEntryArray.map(entry => (
          <EntryComp
            key={entry._id}
            content={entry.content}
            id={entry._id}
            entryClicked={() => nextEntryClicked(entry._id)}
          />
        ))
      ) : (
        // If no:
        <div className="my-2 text-center border">
          <h1>Pick a starting point for your story</h1>
        </div>
      )}
    </div>
  );
}
