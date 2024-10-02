// models/quiz.model.ts

export interface Question {
  question: string;
  questionType: string;
  correctAnswer: string;
}

export interface Quiz {
  id?: string; // Optional for new quizzes
  category: string;
  difficulty: string;
  setTime: string;
  status: string;
  questions: Question[];
}
