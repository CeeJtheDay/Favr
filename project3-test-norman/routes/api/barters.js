const router = require("express").Router();
const bartersController = require("../../controllers/bartersController");

// Matches with "/api/products"
router
  .route("/")
  .post(bartersController.create)
  .get(bartersController.findAll);

// Matches with "/api/products/:id"
router
  .route("/:id")
  .delete(bartersController.remove);


module.exports = router;
