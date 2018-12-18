import React, { Component } from 'react';
import NavBar from "../components/Navbar";
import Saved from "./Saved";
import Search from "./Search";

class MainPage extends Component {
    state = {
        currentPage: "Search"
    };

    handlePageChange = page => {
        this.setState({ currentPage: page});
};


render() {
    return (
        <div>
            <NavBar
                currentPage = {this.state.currentPage}
                handlePageChange = {this.handlePageChange}
                />
                {
                    (this.state.currentPage === "Search"? <Search />:
                    (this.state.currentPage === "Saved"? <Saved />: null))
                }
        </div>
    )
}
};


export default MainPage;
