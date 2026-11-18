const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  stock: {
    type: Number
  }
});

module.exports = mongoose.model(
  "Product",
  productSchema,
  "products"
);