const bought = require("../controllers/bought.controller.js");

var router = require("express").Router();

// Create a new Product
router.post("/", bought.create);

// Retrieve all Products
router.get("/", bought.findAll);

// Retrieve all published Products
router.get("/published", bought.findAllPublished);

// Retrieve a single Product with id
router.get("/:id", bought.findOne);

// Update a Product with id
router.put("/:id", bought.update);

// Delete a Product with id
router.delete("/:id", bought.delete);

// Create a new Product
router.delete("/", bought.deleteAll);

module.exports = router;