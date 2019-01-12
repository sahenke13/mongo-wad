import React from "react";

//this is the modal component for creating new entries.

const newEntry = props => (
  <div>
    <button
      type="button"
      className="btn btn-primary"
      data-toggle="modal"
      data-target="#entryModal"
    >
      Create New Entry
    </button>
    <div
      className="modal fade"
      id="entryModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New Entry
                </h5> */}

          <div className="modal-body">
            <form className="form">
              {/* <div className="form-group">
                      <label htmlFor="Title">Title</label>
                      <textarea className="form-control" id="Title" rows="1" />
                    </div> */}
              {/* <div className="form-group"> */}

              <textarea
                className="form-control spacing"
                id="Entry"
                rows="3"
                type="text"
                name="newEntryContent"
                value={props.newEntryContent}
                onChange={props.handleInputChange}
                placeholder="Start typing"
              />
              {/* </div> */}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={props.newEntry}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  </div>
);

export default newEntry;
