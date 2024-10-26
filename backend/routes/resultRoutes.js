const express = require("express");
const router = express.Router();
const Result = require("../models/resultModel");
const Quiz = require("../models/quizModel");

// @route POST /api/quizzes/submit
// @desc Submit a quiz result
router.post("/quizzes/submit", async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers || answers.length === 0) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // Calculate the number of correct and wrong answers
    let correctAnswers = 0;
    const userAnswers = answers.map((answer) => {
      const question = quiz.questions.find(
        (q) => q.question === answer.question
      );
      const isCorrect =
        question && question.correctAnswer === answer.selectedOption;
      if (isCorrect) correctAnswers++;
      return {
        question: answer.question,
        selectedOption: answer.selectedOption,
        isCorrect: isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;

    // Save the result to the database
    const result = new Result({
      quizId,
      correctAnswers,
      wrongAnswers,
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
