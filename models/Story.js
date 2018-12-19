const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
    storyId: {type: String, required: true},
    title: {type: String, required: true},
    firstEntryId:{type: Number, required: true}, 
    userId: {type: Number, required: true}

})

const Story = mongoose.model("Story", storySchema);

module.exports = Story;