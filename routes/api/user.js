const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const User = mongoose.model("User");

// Passport config stuff/ user routes

// NEW USER / SIGNUP ROUTE (POST)
// Request includes username & password
// Result includs id, username and token
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

// Request includes username & password
// Result will include id, username & token if username & password are matched in DB
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

// GET current route (AUTHENTICATED ROUTES)

// Request has username, password, and JWT TOKEN header
// Result has the user object with username, password & JWT token - only if it finds a match and token is valid. Else it returns a 400
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
