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
      <div>
        
      </div>
    )
  }
}
