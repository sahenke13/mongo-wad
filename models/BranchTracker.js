const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchTrackerSchema = new Schema({

});

const BranchTracker = mongoose.model("BranchTracker", branchTrackerSchema);

module.exports = BranchTracker;