import React, { Component } from "react";
import Form from "../../components/Form";
import JumboTron from "../../components/Jumbotron";
// import BookCard from "../../components/BookCard"
import API from "../../utils/API"
import { List, ListItem } from "../../components/List";
import BookCard from "../../components/BookCard/BookCard";

class Search extends Component {
    state = {
        result: [],
        search: ""
    };

    componentDidMount(){
        
        this.searchBooks("Madame Bovary");
       
    };

    searchBooks = query => {
        console.log("query", query)
        API.search(query)
            .then(res => {
                console.log("API search result: ", res.data)
                console.log(res.data.items)
                this.setState({items: res.data.items}, () => {
                    console.log(res.data, ' is res.data')
                })
                console.log(this.state.result.items)
                console.log("lenght: " ,this.state.result.items.length)
            })        
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        console.log("value is: ", value)  
        console.log("name is: ", name)
        this.setState({
            [name]: value
        });
        
          
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchBooks(this.state.search);
       
    };
    

    render() {
        return (
            <div>
                <JumboTron />
                <Form 
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    />
                    {this.state.items ? (
                        <List>
                        {this.state.items.map((book, i)=> {
                            return (
                                <ListItem>
                                <BookCard
                                    key = {i}
                                    title = {book.volumeInfo.title}
                                    authors = {book.volumeInfo.authors}
                                    description = {book.volumeInfo.description}
                                    link = {book.volumeInfo.infoLink}
                                    image = {book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}
                                />
                                </ListItem>
                            )
                        })}
                        </List>
                ):(<h3>No Results to Display</h3>)}
            </div>
        );
    }
}
    
   


export default Search;