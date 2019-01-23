const db = require("../models");

module.exports = {
  create: function(req, res) {
    db.Entry.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //working on this findALl
  findAll: function(req, res) {
    console.log("req.params: ", req.params);
    db.Entry.find({ previousEntryId: req.params.id })
      .sort()
      .then(dbModel => {
        console.log("dbmodel is: ", dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    db.Entry.find({ userId: req.params.userId })
      .sort({ type: 1, name: 1 })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  findRootEntry: function(req, res) {
    db.Entry.find({ storyId: req.params.storyId })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.Entry.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Entry.updateOne(
      { _id: req.params.id },
      { $push: { nextEntryArray: req.body.idToPush } },
      function(err, raw) {
        if (err) console.log(err);
        console.log("The raw response from Mongo was", raw);
        console.log(req.body);
      }
    );
  },
  remove: function(req, res) {
    db.Entry.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
