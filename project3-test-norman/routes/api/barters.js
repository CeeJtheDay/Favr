const router = require("express").Router();
const bartersController = require("../../controllers/bartersController");

// Matches with "/api/barter"
router
  .route("/")
  .post(bartersController.create)
  .get(bartersController.findAll);

// Matches with "/api/barter/:id"
router
  .route("/:id")
  .delete(bartersController.remove);


module.exports = router;
