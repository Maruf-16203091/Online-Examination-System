import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  quizTitle: string = 'General Knowledge Quiz';
  questions: any[] = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['William Shakespeare', 'J.K. Rowling', 'Mark Twain', 'Charles Dickens'],
      correctAnswer: 'William Shakespeare'
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
      correctAnswer: 'Jupiter'
    }
  ];

  currentQuestionIndex: number = 0;
  selectedOption: string | undefined;
  timer: number = 20000; // 20 seconds for demo purposes

  constructor(private router: Router) {}

  ngOnInit() {
    this.startTimer();
  }

  nextQuestion() {
    if (this.selectedOption) {
      this.currentQuestionIndex++;
      this.selectedOption = undefined; // Reset selection for the next question

      if (this.currentQuestionIndex === this.questions.length) {
        this.submitQuiz();
      }
    }
  }

  submitQuiz() {
    console.log('Quiz Submitted!');
    this.router.navigate(['/results']);
  }

  startTimer() {
    const interval = setInterval(() => {
      this.timer -= 1000;
      if (this.timer <= 0) {
        clearInterval(interval); // Stop the interval
        this.submitQuiz(); // Auto-submit when the time is up
      }
    }, 1000);
  }

  get formattedTime() {
    const minutes = Math.floor(this.timer / 60000);
    const seconds = Math.floor((this.timer % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
