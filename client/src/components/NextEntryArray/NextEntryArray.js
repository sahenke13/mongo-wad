import React from "react";

export default function NextEntryArray({
  nextEntryArray,
  nextEntryClicked,
  upVote,
  downVote
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
                <i
                  className="fas fa-angle-down p-1 pointerGuy"
                  onClick={() => downVote()}
                />
                <i
                  className="fas fa-angle-up  p-1 pointerGuy"
                  onClick={() => upVote()}
                />
              </span>
            </div>
          </div>
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
