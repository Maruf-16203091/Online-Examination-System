import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz | undefined;
  quizInstructions: string = 'Please read the following instructions carefully before starting the quiz.';
  userId: string | null = null;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.getCurrentUserId(); // Retrieve the user ID
    if (!this.userId) {
      console.error('User ID is missing. Please log in.');
      this.router.navigate(['/login']); // Redirect to login page if userId is not found
    } else {
      this.loadQuizDetails();
    }
  }


  loadQuizDetails(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe(
        (quiz) => {
          this.quiz = quiz;
        },
        (error) => {
          console.error('Error fetching quiz details:', error);
        }
      );
    }
  }

  startQuiz(): void {
    const quizId = this.quiz?._id;
    if (quizId && this.userId) {
      this.router.navigate(['/start-quiz', quizId], {
        queryParams: { userId: this.userId }
      });
    } else {
      console.error('Quiz ID or User ID is missing!');
    }
  }

}
