import axios from "axios";

export default {
  //Story API routes
  getStories: function() {
    return axios.get("/api/story");
  },
  getStory: function(id) {
    return axios.get("/api/story/" + id);
  },
  deleteStory: function(id) {
    return axios.delete("/api/story/" + id);
  },
  saveStory: function(storyData) {
    return axios.post("/api/story", storyData);
  },
  updateStory: function(id, storyData) {
    return axios.put("/api/story/" + id, storyData);
  },

  getStoryByUser: function(userId) {
    return axios.get("/api/story/byuser" + userId);
  },

  //Entry API routes
  getEntries: function() {
    return axios.get("/api/entry");
  },
  displayRootEntry: function(storyId) {
    return axios.get("/api/entry/root/" + storyId);
  },
  displayEntry: function(entryId) {
    return axios.get("/api/entry/" + entryId);
  },
  displayNextEntries: function(nextEntryArray) {
    return axios.get("/api/entry/next/" + nextEntryArray);
  },
  deleteEntry: function(id) {
    return axios.delete("/api/entry/" + id);
  },
  updateEntry: function(id, entryData) {
    return axios.put("/api/entry/" + id, entryData);
  },
  saveEntry: function(entryData) {
    return axios.post("/api/entry", entryData);
  },
  getEntryByUser: function(userId) {
    return axios.get("/api/entry/byuser/" + userId);
  }
};
