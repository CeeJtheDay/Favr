const db = require("../models");
const axios = require("axios");
// Defining methods for the productsController
module.exports = {
  create: function(req, res) {
    db.Barter.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Barter.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function (req,res) {
    db.Barter.find({})
    .then(data =>res.json(data))
    .catch(err=>res.status(422).json(err));
  }
};
