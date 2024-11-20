const Quiz = require("../models/quizModel");
const Result = require("../models/resultModel");

async function evaluateQuiz(quizId, userId, userAnswers) {
  try {

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    const questions = quiz.questions;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const totalQuestions = questions.length;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    // Save result
    const result = new Result({
      userId,
      quizId,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      percentage,
    });

    await result.save();
    return { message: "Quiz evaluated successfully", result };
  } catch (error) {
    console.error("Error evaluating quiz:", error.message);
    throw error;
  }
}

module.exports = { evaluateQuiz };
