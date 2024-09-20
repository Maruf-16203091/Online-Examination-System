const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  type: { type: String, required: true }, // Ensure 'type' is defined and required if necessary
  rating: { type: String, required: true }, // Ensure 'rating' is defined and required if necessary
  questions: [
    {
      question: { type: String, required: true }, // Each question needs to have required fields
      options: { type: [String], required: true }, // Options should be an array of strings
      answer: { type: String, required: true } // Answer must also be a string
    }
  ]
}, { timestamps: true });


module.exports = mongoose.model('Training', TrainingSchema);
