const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
