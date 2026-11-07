
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
connectDB();

// Home API
app.get("/", (req, res) => {
    res.send("Node.js Server is Running Successfully!");
});

// Student routes
app.use("/api/students", require("./routes/studentRoutes"));

// Server port
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
