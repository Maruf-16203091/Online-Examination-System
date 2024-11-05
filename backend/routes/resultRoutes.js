const express = require("express");
const router = express.Router();
const Result = require("../models/resultModel");
const Quiz = require("../models/quizModel");

// @route POST /api/quizzes/submit
// @desc Submit a quiz result
router.post("/quizzes/submit", async (req, res) => {
  try {
    const { quizId, answers, userId } = req.body;

    // Validate required fields
    if (!quizId || !answers || answers.length === 0 || !userId) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // Initialize score and correct answer counter
    let correctAnswers = 0;
    const userAnswers = answers.map((answer) => {
      const question = quiz.questions.find(
        (q) => q.question === answer.question
      );
      const isCorrect =
        question && question.correctAnswer === answer.selectedOption; // Ensure this uses `correctAnswer`

      // Increment correctAnswers count if answer is correct
      if (isCorrect) correctAnswers++;

      return {
        question: answer.question,
        selectedOption: answer.selectedOption,
        correctOption: question ? question.correctAnswer : null, // Ensure correct field here as well
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const score = correctAnswers; // Each correct answer is worth 1 point
    const percentage = totalQuestions
      ? (correctAnswers / totalQuestions) * 100
      : 0;

    // Save the result to the database
    const result = new Result({
      userId,
      quizId,
      category: quiz.category,
      correctAnswers,
      incorrectAnswers,
      totalQuestions,
      score,
      percentage,
      userAnswers,
    });

    await result.save();
    res.status(201).json({
      message: "Quiz result submitted successfully.",
      score,
      percentage,
    });
  } catch (err) {
    console.error("Error submitting quiz result:", err);
    res.status(500).json({ message: "Error submitting quiz result." });
  }
});

// Add this route in your results API file (e.g., resultRoutes.js)
router.get("/results/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch results based on userId
    const results = await Result.find({ userId }).populate(
      "quizId",
      "category"
    ); // Populate quizId to get the category

    if (!results.length) {
      return res
        .status(404)
        .json({ message: "No results found for this user." });
    }

    res.json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Error fetching results." });
  }
});

module.exports = router;
