const router = require("express").Router();
const barterRoutes = require("./barters");
const userRoutes = require("./users");

// Post routes
router.use("/barters", barterRoutes);
router.use("/users", userRoutes);

module.exports = router;
