
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("--------------------------------");
    console.log("MongoDB Connected Successfully!");
    console.log("Database Name:", mongoose.connection.name);
    console.log("Cluster Host:", mongoose.connection.host);
    console.log("--------------------------------");

  } catch (error) {
    console.error("MongoDB Connection Failed!");
    console.error("Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
