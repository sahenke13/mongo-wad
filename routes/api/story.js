const router = require("express").Router();
const storyController = require("../../controllers/storyController");

router.route("/")
    .get(storyController.findAll)
    .post(storyController.create);

router.route("/mostRecent")
    .get(storyController.findRecentId)

router.route("/:id")
    .get(storyController.findById)
    .put(storyController.update)
    .delete(storyController.remove);
    
router.route("/byuser/:userId")
    .get(storyController.findByUser);
    
module.exports = router;