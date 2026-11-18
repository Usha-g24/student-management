
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

// Database connection
const connectDB = require("./config/db.js");

// Import Routes
const uploadRoutes = require("./routes/uploadRoutes");
const studentRoutes = require("./routes/studentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Node.js Server is Running Successfully!"
  });
});

// Student APIs
app.use("/api/students", studentRoutes);

// Employee APIs
app.use("/api/employees", employeeRoutes);

// Product APIs
app.use("/api/products", productRoutes);

// S3 Upload APIs
app.use("/api/files", uploadRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found"
  });
});

// Server Configuration
const PORT = process.env.PORT || 3000;

// Start Server
const startServer = async () => {
  try {
    console.log("MongoDB Connected Starting!");

    const conn = await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log("================================");
      console.log("MongoDB Connected Successfully!");
      console.log("Connected Database:", require("mongoose").connection.name);
      console.log("Server running on port:", PORT);
      console.log("================================");
    });

  } catch (error) {
    console.error("Server Startup Failed:", error.message);
    process.exit(1);
  }
};

startServer();
