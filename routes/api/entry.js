const router = require("express").Router();
const entryController = require("../../controllers/entryController");

router
	.route("/")
	.get(entryController.findAll)
	.post(entryController.create);

router.route("/root/:storyId").get(entryController.findRootEntries);

router
	.route("/:id")
	.put(entryController.update)
	.delete(entryController.remove)
	.get(entryController.findById);

router.route("/byuser/:userId").get(entryController.findByUser);

router.route("/next/:nextEntryArray").get(entryController.findNextEntries);

module.exports = router;
