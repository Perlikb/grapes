const Grape = require("../models/grapeModel");

//Creates new row in table
exports.create = (req, res) => {
  console.log(req.body);

  //Validates request
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const grape = new Grape({
    name: req.body.name,
    color: req.body.color,
    wine: req.body.wine,
  });

  Grape.create(grape, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while creating new row.",
      });
    else res.send(data);
  });
};

exports.listAll = (req, res) => {
  console.log(req.query);
  let page = 0;
  let name = null;
  let color = null;
  let wine = null;
  if (req.query.name) name = req.query.name;
  if (req.query.color) {
    console.log(req.query);
    color = req.query.color;
  }
  if (req.query.wine) wine = req.query.wine;

  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }

  Grape.list(name, color, wine, page, 5, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while retrieving grapelist.",
      });
    else {
      // console.log(data);
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  Grape.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found grape with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving grape with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  Grape.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found grape with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete grape with id " + req.params.id,
        });
      }
    } else res.send({ message: `Grape row was deleted successfully!` });
  });
};

exports.updateOne = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  //Creates new row with class constructor
  const upDatedGrape = new Grape(req.body);

  Grape.updateItem(req.params.id, upDatedGrape, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found grape with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating items with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
