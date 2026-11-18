const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  department: {
    type: String
  },
  designation: {
    type: String
  },
  salary: {
    type: Number
  },
  city: {
    type: String
  },
  experience: {
    type: Number
  }
});

module.exports = mongoose.model(
  "Employee",
  employeeSchema,
  "employees"
);