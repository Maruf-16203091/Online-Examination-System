const express = require("express");
const router = express.Router();
const Result = require("../models/resultModel");
const Quiz = require("../models/quizModel");

// @route POST /api/quizzes/submit
// @desc Submit a quiz result
router.post("/quizzes/submit", async (req, res) => {
  try {
    const { quizId, answers, userId } = req.body; // Destructured userId

    // Validate required fields
    if (!quizId || !answers || answers.length === 0 || !userId) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // Calculate the number of correct and incorrect answers
    let correctAnswers = 0;
    const userAnswers = answers.map((answer) => {
      const question = quiz.questions.find((q) => q.question === answer.question);
      const isCorrect = question && question.correctOption === answer.selectedOption;

      if (isCorrect) correctAnswers++;

      return {
        question: answer.question,
        selectedOption: answer.selectedOption,
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;
    const incorrectAnswers = totalQuestions - correctAnswers; // Updated variable name
    const percentage = totalQuestions ? (correctAnswers / totalQuestions) * 100 : 0; // Handle division by zero

    // Save the result to the database
    const result = new Result({
      userId,
      quizId,

      category: quiz.category,
      correctAnswers,
      incorrectAnswers, 
      totalQuestions,
      percentage,
      userAnswers,
    });

    await result.save();
    res.status(201).json({ message: "Quiz result submitted successfully." });
  } catch (err) {
    console.error("Error submitting quiz result:", err);
    res.status(500).json({ message: "Error submitting quiz result." });
  }
});

module.exports = router;
