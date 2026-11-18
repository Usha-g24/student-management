const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const uploadRoutes = require("./routes/uploadRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.send("Node.js Server is Running Successfully!");
});

// Upload routes
app.use("/api/files", uploadRoutes);

// Student routes
app.use("/api/students", studentRoutes);

// Server startup
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
