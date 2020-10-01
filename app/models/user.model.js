const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    username: String,
    password: String,
    customer_flg: String,
    product_flg: String,
    income_flg: String,
    outcome_flg: String,
  },
  { timestamps: true }
);
const User = mongoose.model("User", schema);
module.exports = User;