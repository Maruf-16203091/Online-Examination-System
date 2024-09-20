const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const quizRoutes = require("./routes/quizRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");


dotenv.config();


// Initialize Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.use("/api/auth", authRoutes);  // Auth routes

// Define a simple route
app.get("/", (req, res) => {
  res.send("Quiz App Backend");
});

// Use the user routes
app.use("/api", userRoutes);

// Use the quiz routes
app.use("/api", quizRoutes);

// Use the quiz routes
app.use("/api", trainingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
