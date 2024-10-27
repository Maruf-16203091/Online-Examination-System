const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    option_1: {
      type: String,
      required: true,
    },
    option_2: {
      type: String,
      required: false,
    },
    option_3: {
      type: String,
      required: false,
    },
    option_4: {
      type: String,
      required: false,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
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
    questionType: {
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
      type: [questionSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
