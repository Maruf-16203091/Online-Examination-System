

export interface UserAnswer {
  question: string;           // The text of the question
  selectedOption: string;     // The option chosen by the user
  isCorrect: boolean;         // Indicates if the user's answer was correct
}

export interface Result {
  userId: string;            // Reference to the User ID
  quizId: string;            // Reference to the Quiz ID
  category: string;          // The category of the quiz
  correctAnswers: number;    // Number of correct answers
  incorrectAnswers: number;  // Number of incorrect answers
  totalQuestions: number;    // Total questions in the quiz
  score: number;             // User's score
  percentage: number;        // Percentage score
  userAnswers: UserAnswer[]; // Array of user answers
  attemptDate: Date;         // Date of the quiz attempt
  createdAt?: Date;          // Optional created at timestamp
  updatedAt?: Date;          // Optional updated at timestamp
}
