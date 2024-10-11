// models/quiz.model.ts

export interface Question {
  question: string;
  options: string;
  correctAnswer: string;
}

export interface Quiz {
  _id?: string; // Optional for new quizzes
  category: string;
  questionType: string;
  difficulty: string;
  setTime: string;
  status: string;
  questions: Question[];
}
