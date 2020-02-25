const db = require("../models");

// Defining methods for the productsController
module.exports = {
  signUp: function (req, res) {
    console.log(req.body);
    db.User.create(req.body)
      .then(data => res.json(data))
      .catch(err => {
        console.log(err.message);
        res.status(500).json(err.message);
      })
  },
  findAllUsers: function(req,res) {
    db.User.find({})
    .then(data=>{
      res.json(data)
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json(err.message);
    })
  }
};
