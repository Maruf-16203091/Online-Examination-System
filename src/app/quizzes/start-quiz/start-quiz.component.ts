import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../../services/quiz.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Quiz } from '../../models/quiz.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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
  selectedAnswers: { [key: number]: string } = {};
  timer: number = 0;
  interval: any;
  userId: string | null = null;
  score: number = 0; // Keep track of the user's score

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private quizService: QuizService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.userService.getCurrentUserId();
    const quizId = this.route.snapshot.paramMap.get('id');

    if (quizId) {
      this.loadQuizDetails(quizId);
    }
  }


  ngOnDestroy() {
    this.clearTimer();
  }

  loadQuizDetails(id: string): void {
    this.quizService.getQuizById(id).subscribe(
      (quiz: Quiz) => {
        this.quiz = quiz;
        this.quizTitle = quiz.category;
        this.questionType = quiz.questionType;
        this.difficulty = quiz.difficulty;

        // Assuming options are already in array format
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
    } else {
      this.submitQuiz();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  selectOption(option: string) {
    // Store the selected answer for the current question
    this.selectedAnswers[this.currentQuestionIndex] = option;
  }

  submitQuiz() {
    this.clearTimer();

    if (this.quiz && this.quiz._id && this.userId) {
      const userAnswers = this.questions.map((q, index) => {
        const selectedOption = this.selectedAnswers[index] || null;
        const isCorrect = q.correctAnswer === selectedOption;

        return {
          question: q.question,
          selectedOption, // User's selected option
          correctOption: q.correctAnswer, // Correct option for this question
          isCorrect, // Boolean indicating if answer is correct
        };
      });

      // Submit quiz with quizId, userId, and answers
      this.quizService.submitQuizResult(this.quiz._id, this.userId, userAnswers).subscribe(
        () => {
          this.openDialog(`Quiz Submitted!`, 'Success', 'success');
        },
        (error) => {
          console.error('Error submitting quiz:', error);
          this.openDialog('An error occurred while submitting the quiz.', 'Error', 'error');
        }
      );

    } else {
      console.error('Quiz ID or User ID is missing');
      this.openDialog('Unable to submit the quiz. Quiz or User information is missing.', 'Error', 'error');
    }
  }



  startTimer() {
    this.interval = setInterval(() => {
      this.timer -= 1000;
      if (this.timer <= 0) {
        this.clearTimer();
        this.openDialog('Time is up! Try next time.', 'Time Over', 'end');
      }
    }, 1000);
  }

  clearTimer() {
    if (this.interval) {
      clearInterval(this.interval);
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

  convertMinutesToMilliseconds(minutes: string): number {
    const timeInMinutes = parseInt(minutes.split(' ')[0], 10);
    return timeInMinutes * 60000;
  }
}
