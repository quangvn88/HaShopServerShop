const db = require("../models");
const model = db.user;

// Check login
exports.checkLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body.username);

  var condition = { username: username, password: password };

  model.find(condition)
    .then(data => {
      res.send(JSON.stringify(data[0]));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving record."
      });
    });
};

// Create and Save record
exports.create = (req, res) => {
  // Create a record
  const user = new model({
    username: req.body.username,
    password: req.body.password,
    customer_flg: req.body.customer_flg,
    product_flg: req.body.product_flg,
    income_flg: req.body.income_flg,
    outcome_flg: req.body.outcome_flg
  });

  // Save record in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the record."
      });
    });
};

// Retrieve all records
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  model.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single record with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  model.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found record with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving record with id=" + id });
    });
};

// Update a record by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a record with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all records from the database.
exports.deleteAll = (req, res) => {
  model.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Records were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records."
      });
    });
};

// Find all published records
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};