// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// JWT Secret from env
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// @route POST /api/auth/register
// @desc Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password, phone, bio,role, profileImage } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      bio,
      role,
      profileImage,
    });

    // Save user
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Send token and user details in response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /api/auth/login
// @desc Login user and return token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Debug: Log the incoming request body to check the payload
  console.log("Login request body:", req.body);

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Use the method from user model to check if the password matches
    const isMatch = await user.matchPassword(password);
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      console.log("Passwords do not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Send token and user details in response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: err.message });
  }
});

// @route POST /api/auth/logout
// @desc Logout user (mainly handled client-side)
router.post("/logout", (req, res) => {
  // Just a response because JWTs are stateless
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
