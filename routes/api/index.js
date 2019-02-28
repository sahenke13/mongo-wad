const router = require("express").Router();
const entryRoutes = require("./entry");
const storyRoutes = require("./story");
const userRoutes = require("./user");

router.use("/entry", entryRoutes);
router.use("/story", storyRoutes);
router.use("/user", userRoutes);

module.exports = router;
