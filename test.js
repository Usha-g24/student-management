
const mongoose = require("mongoose");
require("dotenv").config();

const findData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected!");
    console.log("Database:", mongoose.connection.name);

    // Directly access existing collection
    const collection = mongoose.connection.db.collection("Studentinfo");

    // Fetch all documents
    const students = await collection.find({}).toArray();

    console.log("Total Records:", students.length);
    console.log("Student Data:");

    console.log(JSON.stringify(students, null, 2));

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

findData();
