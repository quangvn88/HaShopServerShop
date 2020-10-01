const db = require("../models");
const Bought = db.bought;

// Create and Save a new Bought
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Bought
    const bought = new Bought({
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        payment_status: false,
        products: req.body.products
    });

    // Save Bought in the database
    bought
        .save(bought)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bought."
            });
        });
};

// Retrieve all Boughts from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Bought.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving boughts."
            });
        });
};

// Find a single Bought with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Bought.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Bought with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Bought with id=" + id });
        });
};

// Update a Bought by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Bought.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Bought with id=${id}. Maybe Bought was not found!`
                });
            } else res.send({ message: "Bought was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Bought with id=" + id
            });
        });
};

// Delete a Bought with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Bought.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Bought with id=${id}. Maybe Bought was not found!`
                });
            } else {
                res.send({
                    message: "Bought was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Bought with id=" + id
            });
        });
};

// Delete all Boughts from the database.
exports.deleteAll = (req, res) => {
    Bought.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Boughts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all boughts."
            });
        });
};

// Find all published Boughts
exports.findAllPublished = (req, res) => {
    Bought.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving boughts."
            });
        });
};