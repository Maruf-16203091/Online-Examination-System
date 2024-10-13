import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../../services/quiz.service'; // Adjust path as needed
import { DialogComponent } from '../dialog/dialog.component';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit, OnDestroy {
  quiz: Quiz | undefined;
  quizTitle: string = '';
  questionType: string = '';
  difficulty: string = '';
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: string | undefined;
  timer: number = 0;
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.loadQuizDetails(quizId);
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  // Fetch quiz details from the service
  loadQuizDetails(id: string): void {
    this.quizService.getQuizById(id).subscribe(
      (quiz: Quiz) => {
        this.quiz = quiz;
        this.quizTitle = quiz.category;
        this.questionType = quiz.questionType;
        this.difficulty = quiz.difficulty;
        this.questions = quiz.questions;
        this.timer = this.convertMinutesToMilliseconds(quiz.setTime);
        this.startTimer();
      },
      (error) => {
        console.error('Error loading quiz:', error);
      }
    );
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = undefined; // Clear selected option for the next question
    } else {
      this.submitQuiz();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOption = undefined; // Clear selected option for the previous question
    }
  }

  submitQuiz() {
    this.clearTimer(); // Stop the timer
    this.openDialog('Quiz Submitted!', 'Success', 'success');
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timer -= 1000;
      if (this.timer <= 0) {
        this.clearTimer(); // Stop the timer if time runs out
        this.openDialog('Time is up! Try next time.', 'Time Over', 'end');
      }
    }, 1000);
  }

  clearTimer() {
    if (this.interval) {
      clearInterval(this.interval); // Clear the interval to stop the timer
    }
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

  openDialog(message: string, title: string, type: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message, title, type }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  // Convert setTime in the format "10 Minutes" to milliseconds for the timer
  convertMinutesToMilliseconds(minutes: string): number {
    const timeInMinutes = parseInt(minutes.split(' ')[0], 10); // Extract numeric value from "10 Minutes"
    return timeInMinutes * 60000; // Convert minutes to milliseconds
  }
}
