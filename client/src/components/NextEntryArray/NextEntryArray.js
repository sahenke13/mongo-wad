import React from "react";
import EntryComp from "../EntryComp";

export default function NextEntryArray({
  nextEntriesArray,
  nextEntryClicked,
  sortEntry
}) {
  return (
    <div>
      {nextEntriesArray ? (
        // If yes:

        nextEntriesArray.map(entry => (
          <EntryComp
            key={entry._id}
            content={entry.content}
            id={entry._id}
            entryClicked={() => nextEntryClicked(entry._id)}
            handleSorting={() => sortEntry()}
          />
        ))
      ) : (
        // If no:
        <div className="my-2 text-center border bg-white">
          <h1>Pick a starting entry for your story</h1>
        </div>
      )}
    </div>
  );
}
