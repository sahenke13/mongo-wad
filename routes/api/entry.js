const router = require("express").Router();
const entryController = require("../../controllers/entryController");

router
  .route("/")
  .get(entryController.findAll)
  .post(entryController.create);

router.route("/root/:storyId").get(entryController.findRootEntry);
<<<<<<< HEAD

router.route("/next/:nextEntriesArray").get(entryController.findNextEntries);

=======
  
>>>>>>> aeb471b563095ce8905957387e08f5a0814ad027
router
  .route("/:id")
  .put(entryController.update)
  .delete(entryController.remove)
  .get(entryController.findAll);

router.route("/byuser/:userId").get(entryController.findByUser);

module.exports = router;
