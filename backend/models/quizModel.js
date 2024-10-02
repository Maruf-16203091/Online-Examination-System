const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { _id: false } // No need for a separate _id for each question
);

const quizSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    setTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    questions: {
      type: [questionSchema], // Array of question objects
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
