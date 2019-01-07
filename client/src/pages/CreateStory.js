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
                            onChange={this.handleInputChange}
                            className ="form-control" 
                            placeholder = "Give your Story a name"
                            /> 
                {/* Genre Entry */}
                        <input type ="text" className ="form-control" id = "genre" placeholder = "Decide on the genre"/>
                
                {/* Root Entry */}
                        <textarea className ="form-control" id = "rootEntry" rows="10" placeholder = "Start your story here"/>
                    
                </form>
                
            </div>
        </div>
      </div>
    )
  }
}
