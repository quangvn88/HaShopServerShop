const userController = require("../controllers/user.controller.js");

var router = require("express").Router();

// Check login
router.post("/checkLogin", userController.checkLogin);

// Create a new record
router.post("/", userController.create);

// Retrieve all records
router.get("/", userController.findAll);

// Retrieve all published records
router.get("/published", userController.findAllPublished);

// Retrieve a single record with id
router.get("/:id", userController.findOne);

// Update a record with id
router.put("/:id", userController.update);

// Delete a record with id
router.delete("/:id", userController.delete);

// Create a new record
router.delete("/", userController.deleteAll);

module.exports = router;