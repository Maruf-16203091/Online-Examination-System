const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    question: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    questionType: {
      type: String,
    },
    setTime: {
      type: String,
    },
    correctAnswer: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
