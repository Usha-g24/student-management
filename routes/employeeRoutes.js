
const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");

// GET ALL EMPLOYEES
router.get("/", async (req, res) => {
  try {
    console.log("========== EMPLOYEE DEBUG ==========");

    console.log("Database:", Employee.db.name);
    console.log("Collection:", Employee.collection.name);

    const total = await Employee.countDocuments({});

    console.log("Total Documents:", total);

    const employees = await Employee.find({}).lean();

    console.log("Fetched Records:", employees.length);

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });

  } catch (error) {
    console.error("EMPLOYEE GET ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
