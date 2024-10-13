const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizModel");

// @route GET /api/quizzes
// @desc Get all quizzes
router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /api/quizzes
// @desc Create a new quiz
router.post("/quizzes", async (req, res) => {
  const { category, difficulty, questionType, setTime, status, questions } =
    req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one question is required." });
  }

  const newQuiz = new Quiz({
    category,
    difficulty,
    setTime,
    questionType,
    status,
    questions,
  });

  try {
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route GET /api/quizzes/filter
// @desc Get filtered quizzes based on category, difficulty, and question type
router.get("/quizzes/filter", async (req, res) => {
  try {
    const { category, difficulty, questionType, dateRange } = req.query;

    // Build the query object dynamically based on available filters
    let query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (questionType) query.questionType = questionType;

    // Date range filter (for example, last X days)
    if (dateRange) {
      const currentDate = new Date();
      let startDate;

      if (dateRange === "Last 7 Days") {
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
      } else if (dateRange === "Last 30 Days") {
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
      } else if (dateRange === "Last 6 Months") {
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
      } else if (dateRange === "Last Year") {
        startDate = new Date(
          currentDate.setFullYear(currentDate.getFullYear() - 1)
        );
      }

      query.createdAt = { $gte: startDate };
    }

    // Fetch quizzes based on the filter
    const quizzes = await Quiz.find(query);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route GET /api/quizzes/:id
// @desc Get a single quiz by ID
router.get("/quizzes/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route PUT /api/quizzes/:id
// @desc Update a quiz by ID
router.put("/quizzes/:id", async (req, res) => {
  const { category, difficulty, questionType, setTime, status, questions } =
    req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one question is required." });
  }

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        category,
        difficulty,
        setTime,
        questionType,
        status,
        questions,
      },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/quizzes/:id
// @desc Delete a quiz by ID
router.delete("/quizzes/:id", async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
