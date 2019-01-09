const router = require("express").Router();
const entryController = require("../../controllers/entryController");

router
  .route("/")
  .get(entryController.findAll)
  .post(entryController.create);

router
  .route("/:id")
  .get(entryController.findById)
  .put(entryController.update)
  .delete(entryController.remove);

router.route("/byuser/:userId").get(entryController.findByUser);

module.exports = router;
