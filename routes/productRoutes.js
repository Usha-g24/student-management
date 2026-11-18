
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    console.log("========== PRODUCT DEBUG ==========");

    console.log("Database:", Product.db.name);
    console.log("Collection:", Product.collection.name);

    const total = await Product.countDocuments({});

    console.log("Total Documents:", total);

    const products = await Product.find({}).lean();

    console.log("Fetched Records:", products.length);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error("PRODUCT GET ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
