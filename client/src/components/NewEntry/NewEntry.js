import React from "react";

//this is the modal component for creating new entries.

const newEntry = ({ newEntryContent, handleInputChange, newEntrySubmit }) => (
  <div>
    <div
      className="modal fade"
      id="entryModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="container">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {/* <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New Entry
                </h5> */}

            <div className="modal-body">
              <form className="form-group">
                <textarea
                  className="form-control"
                  id="Entry"
                  rows="3"
                  type="text"
                  name="newEntryContent"
                  value={newEntryContent}
                  onChange={handleInputChange}
                  placeholder="Start typing"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary my-2"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn text-white submitGuy my-2"
                onClick={newEntrySubmit}
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default newEntry;
