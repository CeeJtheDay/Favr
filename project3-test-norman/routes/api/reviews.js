const router = require("express").Router();
const db = require("../../models");
// Matches with "/api/reviews"
router.route("/").post((req, res) => {
    console.log(req.body);
    db.Review.create(req.body)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err.message);
            res.status(500).json(err.message);
        })
})

module.exports = router;
