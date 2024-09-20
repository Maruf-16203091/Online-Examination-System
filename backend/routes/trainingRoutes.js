const express = require('express');
const router = express.Router();
const Training = require('../models/trainingModel');

// @route GET /api/training
// @desc Get all training
router.get('/training', async (req, res) => {
  try {
    const training = await Training.find();
    res.json(training);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /api/training
// @desc Create a new Training
router.post('/training', async (req, res) => {
  const { category, description, difficulty, type,rating, questions } = req.body;
  const newTraining = new Training({
    category,
    description,
    difficulty,
    type,
    rating,
    questions
  });

  try {
    const savedTraining = await newTraining.save();
    res.status(201).json(savedTraining);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route GET /api/training/:id
// @desc Get a single Training by ID
router.get('/training/:id', async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }
    res.json(training);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route PUT /api/training/:id
// @desc Update a Training by ID
router.put('/training/:id', async (req, res) => {
  try {
    const updatedTraining = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTraining) {
      return res.status(404).json({ message: 'Training not found' });
    }
    res.json(updatedTraining);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/training/:id
// @desc Delete a Training by ID
router.delete('/training/:id', async (req, res) => {
  try {
    const deletedTraining = await Training.findByIdAndDelete(req.params.id);
    if (!deletedTraining) {
      return res.status(404).json({ message: 'Training not found' });
    }
    res.json({ message: 'Training deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
