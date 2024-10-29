// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); 

// @route GET /api/users
// @desc Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /api/users
// @desc Register a new user
router.post("/users", async (req, res) => {
  const { name, email, password, profileImage, phone, bio, role } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    profileImage,
    phone,
    bio,
    role,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route GET /api/users/:id
// @desc Get a single user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route PUT /api/users/:id
// @desc Update a user by ID
router.put("/users/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, email, bio, phone } = req.body;
    const updatedData = { name, email, bio, phone };

    // If there is a file, add it to updatedData
    if (req.file) {
      updatedData.profileImage = req.file.path; // Save path in database
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/users/:id
// @desc Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
