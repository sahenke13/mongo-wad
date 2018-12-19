const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nextEntrySchema = new Schema({
    nextEntry: {type: Number}
})





const entrySchema = new Schema({
    userId: {type: Number, required: true},
    storyId: {type: Number, required: true},
    content: {type: String, required: true},
    previousEntryId: {type: Number},
    NextEntryArray:[nextEntrySchema]

});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;