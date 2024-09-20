const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  type: {
    type: String,
  },
  rating: {
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
