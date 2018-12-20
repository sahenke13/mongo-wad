const router = require("express").Router();
const entryRoutes = require("./entry");
const storyRoutes = require("./story");

router.use("/entry", entryRoutes);
router.use("/story", storyRoutes);

module.exports = router;