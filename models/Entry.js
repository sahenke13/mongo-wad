const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  // userId: {type: Number, required: true},
  storyId: String,
  content: {
    type: String,
    required: true
  },
  previousEntryId: String,
  nextEntryArray: Array,
  voteCount: Number
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
