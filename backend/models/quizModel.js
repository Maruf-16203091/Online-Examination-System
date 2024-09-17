const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
