const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
import auth from "../auth";
const User = mongoose.model("User");

// Passport config stuff/ user routes

// NEW USER / SIGNUP ROUTE (POST)
// Request object includes username & password
// Result object includs id, username and token
router.post("/", auth.optional, (req, res, next) => {
	const {
		body: { user }
	} = req;

	if (!user.username) {
		return res.status(422).json({
			errors: {
				username: "is required"
			}
		});
	}
	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: "is required"
			}
		});
	}

	const finalUser = new User(user);

	finalUser.setPassword(user.password);

	return finalUser
		.save()
		.then(() => res.json({ user: finalUser.toAuthJSON() }));
});

// LOGIN ROUTE (POST)

// Request object includes username & password
// Result object will include id, username & token if username & password are matched in DB
router.post("/login", auth.optional, (req, res, next) => {
	const {
		body: { user }
	} = req;

	if (!user.username) {
		return res.status(422).json({
			errors: {
				username: "is required"
			}
		});
	}
	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: "is required"
			}
		});
	}

	return passport.authenticate(
		"local",
		{ session: false },
		(err, passportUser, info) => {
			if (err) next(err);
			if (passportUser) {
				const user = passportUser;
				user.token = passportUser.generateJWT();

				return res.json({ user: user.toAuthJSON() });
			}
			return status(400).info;
		}
	)(req, res, next);
});

// GET current route (AUTHENTICATED ROUTES) {
router.get("/current", auth.required, (req, res, next) => {
	const {
		payload: { id }
	} = req;

	return User.findById(id).then(user => {
		if (!user) {
			return res.sendStatus(400);
		}
		return res.json({ user: user.toAuthJSON() });
	});
});

module.exports = router;
