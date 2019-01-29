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
          <div key={entry._id} className="row my-2 p-2 bg-white border ">
            <div className="col-md-12 text-justify-right" id="nextEntries">
              <span
                className="pointerGuy"
                onClick={() => nextEntryClicked(entry._id)}
              >
                {entry.content}
              </span>
              <span className="align-middle float-right px-2 ">
                <i className="fas fa-angle-down p-1 pointerGuy" />
                <i className="fas fa-angle-up  p-1 pointerGuy" />
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
