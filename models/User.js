const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

// Hash is the encrypted password and salt is used to help make the generated key as unique as possible
const UserSchema = new Schema({
	username: { type: String, required: true },
	hash: String,
	salt: String
});

// Set password method for each user.  Takes entered password & encrypts it and stores in DB in hexidecimal form
UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
		.toString("hex");
};

// This checks if the provided password is correct for the given username - returns true or false
UserSchema.methods.validatePassword = function(password) {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
		.toString("hex");
	return this.hash === hash;
};

// This generates a JWT token for user access verification & sets the SSO logout expiration at 1 hour I think
UserSchema.methods.generateJWT = function() {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			username: this.username,
			id: this._id,
			exp: parseInt(expirationDate.getTime() / 1000, 10)
		},
		"secret"
	);
};

// not sure yet, think this is what calls for a current token / session to be created when you log in maybe?
UserSchema.methods.toAuthJSON = function() {
	return {
		_id: this._id,
		username: this.username,
		token: this.generateJWT()
	};
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
