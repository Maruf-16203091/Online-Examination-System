const express = require("express");
const router = express.Router();
const { evaluateQuiz } = require("../controllers/resultController");

// Route to evaluate and store quiz results
router.post("/quizzes/:quizId/submit", async (req, res) => {
  const { quizId } = req.params;
  const { userId, answers } = req.body; // Assuming answers is an array of user answers

  try {
    const result = await evaluateQuiz(quizId, userId, answers);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
