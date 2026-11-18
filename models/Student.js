
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    course: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = mongoose.model("Student", studentSchema, "Studentinfo");
