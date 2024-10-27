// models/quiz.model.ts
export interface Question {
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
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
