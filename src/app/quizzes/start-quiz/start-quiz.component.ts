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
    },
    {
      question: 'Which element has the chemical symbol O?',
      options: ['Oxygen', 'Gold', 'Osmium', 'Oganesson'],
      correctAnswer: 'Oxygen'
    },
    {
      question: 'In which year did the Titanic sink?',
      options: ['1912', '1910', '1905', '1920'],
      correctAnswer: '1912'
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
      correctAnswer: 'Leonardo da Vinci'
    },
    {
      question: 'What is the hardest natural substance on Earth?',
      options: ['Diamond', 'Gold', 'Iron', 'Platinum'],
      correctAnswer: 'Diamond'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Mercury', 'Neptune'],
      correctAnswer: 'Mars'
    },
    {
      question: 'Who was the first President of the United States?',
      options: ['George Washington', 'Thomas Jefferson', 'John Adams', 'Abraham Lincoln'],
      correctAnswer: 'George Washington'
    },
    {
      question: 'What is the smallest country in the world?',
      options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
      correctAnswer: 'Vatican City'
    }
  ];


  currentQuestionIndex: number = 0;
  selectedOption: string | undefined;
  timer: number = 600000; // 10 minutes for demo purposes

  constructor(private router: Router) {}

  ngOnInit() {
    this.startTimer();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = undefined; // Reset selection for the next question
    } else {
      this.submitQuiz();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOption = undefined; // Reset selection for the previous question
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

  get isFirstQuestion() {
    return this.currentQuestionIndex === 0;
  }

  get isLastQuestion() {
    return this.currentQuestionIndex === this.questions.length - 1;
  }
}
