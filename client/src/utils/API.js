import axios from "axios";


export default {
 

    //Story API routes
    getStories: function() {
        return axios.get("/api/story");
    },
    deleteStory: function(id) {
        return axios.delete("/api/story/" + id);
    },
    saveStory: function(storyData) {
        return axios.post("/api/story", storyData)
    },
    updateStory: function(id, storyData){
        return axios.put("/api/story/"+ id, storyData)
    },

    getStoryByUser: function(userId){
        return axios.get("/api/story/byuser"+userId)
    },

    getStoryId: function() {
        return axios.get("/api/story/mostRecent")
    },

    //Entry API routes
    getEntries: function(){
        return axios.get("/api/entry")
    },
    deleteEntry: function(id) {
        return axios.delete("/api/entry/" + id);
    },
    upDateEntry: function(id, entryData){
        return axios.put("/api/entry/"+id, entryData)
    },
    saveEntry: function(entryData){
        return axios.post("/api/entry/", entryData)
    },
    getEntryByUser: function(userId){
        return axios.get("/api/entry/byuser/" + userId);
    }
}