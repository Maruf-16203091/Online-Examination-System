import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../../services/quiz.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Quiz } from '../../models/quiz.model';
import { UserService } from '../../services/user.service';

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
  userId: string | null = null; // To store the user ID

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private quizService: QuizService,
    private userService: UserService
  ) { }

  ngOnInit() {


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
        console.log(quiz);  // Debug: Check the quiz structure
        this.quiz = quiz;
        this.quizTitle = quiz.category;
        this.questionType = quiz.questionType;
        this.difficulty = quiz.difficulty;

        // Ensure options are treated correctly
        this.questions = quiz.questions.map(q => ({
          ...q,
          options: typeof q.options === 'string' ? q.options.split(',').map(option => option.trim()) : q.options
        }));

        console.log(this.questions);  // Debug: Check the questions structure
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
      this.selectedOption = undefined;
    } else {
      this.submitQuiz();
    }

    // Update the route with userId in the query params
    const quizId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/start-quiz', quizId], { queryParams: { userId: this.userId } });
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOption = undefined;
    }

    // Update the route with userId in the query params
    const quizId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/start-quiz', quizId], { queryParams: { userId: this.userId } });
  }


  submitQuiz() {
    this.clearTimer();

    if (this.quiz && this.quiz._id) {
      // Map the user's selected answers
      const userAnswers = this.questions.map((q) => ({
        question: q.question,
        selectedOption: this.selectedOption,  // Ensure selectedOption is updated for each question
      }));

      // Submit quiz with quizId, userId, and answers
      this.quizService.submitQuizResult(this.quiz._id, userAnswers).subscribe(
        () => {
          this.openDialog('Quiz Submitted!', 'Success', 'success');
        },
        (error) => {
          console.error('Error submitting quiz:', error);
          this.openDialog('An error occurred while submitting the quiz.', 'Error', 'error');
        }
      );
    } else {
      console.error('User ID or Quiz ID is missing');
      this.openDialog('Unable to submit the quiz. User or Quiz information is missing.', 'Error', 'error');
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
