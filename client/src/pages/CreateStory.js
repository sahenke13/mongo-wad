import React, { Component } from 'react'

export default class CreateStory extends Component {
  
    state = {
        title: "",
        genre: "",
        text: ""
    };
    
    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    };
    

render() {
    return (
      <div className ="container">
        <div className = "row">
            <div className = "col-md-12">
                <form className="form">
                  {/* Title Entry */}
                          <input
                              value = {this.state.title} 
                              type ="text" 
                              name="title"
                              onChange={this.handleInputChange}
                              className ="form-control" 
                              placeholder = "Give your Story a name"
                              /> 
                  {/* Genre Entry */}
                          <input 
                            value= {this.state.genre}
                            type ="text"
                            name = "genre" 
                            onChange = {this.handleInputChange}
                            className ="form-control"
                            placeholder = "Decide on the genre"
                            />
                  {/* Root Entry */}
                          <textarea 
                            value = {this.state.text}
                            onChange = {this.handleInputChange}
                            rows = "10"
                            name="rootEntry"
                            placeholder = "Start your story here"
                            />
                  {/* Submit button */}
                    <button onClick={this.handleFormSubmit}>Submit</button>
                </form>
                
            </div>
        </div>
      </div>
    )
  }
}
