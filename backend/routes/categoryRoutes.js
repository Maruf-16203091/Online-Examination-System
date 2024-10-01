const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");

// @route GET /api/category
// @desc Get all category
router.get("/category", async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /api/category
// @desc Create a new Category
router.post("/category", async (req, res) => {
  const { category, status } = req.body;
  const newCategory = new Category({
    category,
    status,
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route GET /api/category/:id
// @desc Get a single Category by ID
router.get("/category/:id", async (req, res) => {
  try {
    const Category = await Category.findById(req.params.id);
    if (!Category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(Category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route PUT /api/category/:id
// @desc Update a Category by ID
router.put("/category/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/category/:id
// @desc Delete a Category by ID
router.delete("/category/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
