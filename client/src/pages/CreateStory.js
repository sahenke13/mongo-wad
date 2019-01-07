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
                
                <form>
                {/* Title Entry */}
                    <div className = "form-group">
                        <label for="title">Title</label>
                        <input type ="text" className ="form-control" id = "storyTitle" placeholder = "Give your Story a name"/>
                    </div>
                {/* Genre Entry */}
                    <div className = "form-group">
                        <label for="title">Genre</label>
                        <input type ="text" className ="form-control" id = "genre" placeholder = "Decide on the genre"/>
                    </div>
                {/* Root Entry */}
                    <div className = "form-group">
                        <label for="title">Root Entry</label>
                        <textarea className ="form-control" id = "rootEntry" rows="10" placeholder = "Start your story here"/>
                    </div>
                </form>
                
            </div>
        </div>
      </div>
    )
  }
}
