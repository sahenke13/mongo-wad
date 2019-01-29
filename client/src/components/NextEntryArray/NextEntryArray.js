import React from "react";

export default function NextEntryArray({
  nextEntryArray,
  nextEntryClicked,
  currentId
}) {
  return (
    <div>
      {nextEntryArray ? (
        // If yes:

        nextEntryArray.map(entry => (
          <div className="row my-2 p-2 bg-white pointerGuy  border ">
            <div
              key={entry._id}
              className="col-md-12 text-justify-right"
              id="nextEntries"
              onClick={() => nextEntryClicked(entry._id)}
            >
              {entry.content}
              <span className="align-middle float-right px-2 ">
                <i className="fas fa-angle-down p-1" />
                <i className="fas fa-angle-up  p-1" />
              </span>
            </div>
          </div>
        ))
      ) : // If no:
      currentId === "" ? (
        <div className="my-2 text-center border">
          <h1>Pick a starting point for your story</h1>
        </div>
      ) : !nextEntryArray ? (
        <div className="row my-2 text-center border bg-white">
          <div className="col-md-12 p-2 my-3">
            <h1>No Next Entries</h1>
          </div>
        </div>
      ) : (
        <div>Nothing to put here</div>
      )}
    </div>
  );
}
