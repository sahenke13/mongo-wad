const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {
        type: String, 
        required: true
        },
    firstEntryId: Number
    // userId: {type: Number, required: true}

})

const Story = mongoose.model("Story", storySchema);

module.exports = Story;