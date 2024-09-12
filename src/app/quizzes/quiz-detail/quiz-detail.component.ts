import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.css'
})
export class QuizDetailComponent {
  quizTitle: string = 'Mathematics Quiz';
  quizSubject: string = 'Mathematics';
  quizInstructions: string = 'Please read the following instructions carefully before starting the quiz.';

  // Handle starting the quiz
  startQuiz() {
    console.log('Quiz started!');
    // Navigate to the quiz component or begin the quiz logic here
  }
}
