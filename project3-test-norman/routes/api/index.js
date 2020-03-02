const router = require("express").Router();
const barterRoutes = require("./barters");
const userRoutes = require("./users");
const imageRoutes = require("./images");
const reviewRoutes = require("./reviews");
// Post routes
router.use("/barters", barterRoutes);
router.use("/users", userRoutes);
router.use("/images", imageRoutes);
router.use("/reviews", reviewRoutes);
module.exports = router;
