const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const quizRoutes = require("./routes/quizRoutes"); // Import the quiz routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Define a simple route
app.get("/", (req, res) => {
  res.send("Quiz App Backend");
});

// Use the quiz routes
app.use("/api", quizRoutes); // Mount the quiz routes at /api

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));