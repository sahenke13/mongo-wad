import React from "react"; 

export const Form = props => (

  <form>
  <div className="form-group">
      <label className="form-group">Search:</label>
      <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search for a Book"
          id="seartch"
      />
      <br />
      <button
          onClick={props.handleFormSubmit}
          className="btn btn-primary"
      >
          Search
          </button>
  </div>
</form>
)

export default Form;