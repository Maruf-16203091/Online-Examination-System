// routes/resultRoutes.js
const express = require("express");
const router = express.Router();
const Result = require("../models/resultModel");
const Quiz = require("../models/quizModel");

router.post("/submit", async (req, res) => {
  const { quizId, userId, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let correctAnswers = 0;
    let wrongAnswers = 0;

    // Evaluate answers
    answers.forEach((answer, index) => {
      if (answer.selectedOption === quiz.questions[index].correctAnswer) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    // Create result record
    const result = new Result({
      userId,
      quizId,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      percentage,
    });

    await result.save();
    res.status(201).json({ message: "Quiz evaluated successfully", result });
  } catch (error) {
    console.error("Error evaluating quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
