const mongoose = require("mongoose");

const dbConfig = require("../config/db.config.js");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.user = require("./user.model.js");
db.product = require("./product.model.js")(mongoose);
db.bought = require("./bought.model.js")(mongoose);

module.exports = db;