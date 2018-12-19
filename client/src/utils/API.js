import axios from "axios";


export default {
 
    getStories: function() {
        return axios.get("/api/story");
    },
    deleteStory: function(id) {
        return axios.delete("/api/story/" + id);
    },
    saveStory: function(storyData){
        return axios.post("/api/story", storyData)
    }
}