const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.send("Node.js Server is Running Successfully!");
});

// Student routes
app.use("/api/students", require("./routes/studentRoutes"));

// Server startup
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
