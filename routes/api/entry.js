const router = require("express").Router();
const entryController = require("../../controllers/entryController");

router
  .route("/")
  .get(entryController.findAll)
  .post(entryController.create);

router.route("/root/:storyId").get(entryController.findRootEntry);
  
router
  .route("/:id")
  .put(entryController.update)
  .delete(entryController.remove)
  .get(entryController.findAll);

router.route("/byuser/:userId").get(entryController.findByUser);

module.exports = router;
