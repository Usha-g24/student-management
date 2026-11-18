
const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

// CREATE STUDENT
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student
    });

  } catch (error) {
    console.error("POST ERROR:", error.message);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    console.log("========== GET DEBUG ==========");

    console.log("Database:", Student.db.name);
    console.log("Collection:", Student.collection.name);

    const total = await Student.countDocuments({});

    console.log("Total Documents:", total);

    const students = await Student.find({}).lean();

    console.log("Fetched Records:", students.length);

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });

  } catch (error) {
    console.error("GET ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET SINGLE STUDENT
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE STUDENT
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE STUDENT
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
