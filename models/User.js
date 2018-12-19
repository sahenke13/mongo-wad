const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {type: String, required: true},
    userId: {type: Number, required: true}
})

const User = mongoose.model("User", UserSchema);

module.exports = User;