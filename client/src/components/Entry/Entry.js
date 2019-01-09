import React from "react";

const nextEntry = () => (
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#entryModal"
    >
      Launch demo modal
    </button>
    <div
      class="modal fade"
      id="entryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              New Entry
            </h5>

            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="Title">Title</label>
                  <textarea class="form-control" id="Title" rows="1" />
                </div>
                <div class="form-group">
                  <label for="Entry">Entry</label>
                  <textarea class="form-control" id="Entry" rows="3" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default nextEntry;
