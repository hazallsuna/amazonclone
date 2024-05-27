const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  price: Number,
  products: Array,
  email: String,
  address: Object,
});

const Orders = mongoose.model("orders", OrderSchema);

module.exports = Orders;
