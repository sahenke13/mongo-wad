import axios from "axios";
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q="
const APIKEY = process.env.MY_API_KEY




export default {
    search: function(query){
        return axios.get(BASEURL + query);
    },
    getBooks: function() {
        return axios.get("/api/books");
    },
    deleteBook: function(id) {
        return axios.delete("/api/books/" + id);
    },
    saveBook: function(bookData){
        return axios.post("/api/books", bookData)
    }
};