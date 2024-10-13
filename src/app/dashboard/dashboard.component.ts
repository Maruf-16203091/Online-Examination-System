import { Quiz } from '../models/quiz.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  quizzes: Quiz[] = []; // Use this array for multiple quizzes
  singleQuiz!: Quiz;    // Separate variable to store the single quiz fetched by ID

  dashboardStats = [
    { title: 'Total Quizzes', value: 0 },
    { title: 'Active Quizzes', value: 0 },
    { title: 'My Quizzes', value: 0 },
    { title: 'Upcoming Quizzes', value: 0 }
  ];

  isBouncing = false;
  bounceSubscription!: Subscription;

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchQuizzes();
    this.loadDashboardData();
    this.loadQuizDetails();
    this.bounceSubscription = timer(0, 10000).subscribe(() => {
      this.isBouncing = true;
      setTimeout(() => this.isBouncing = false, 1000);
    });
  }

  fetchQuizzes(): void {
    this.quizService.getQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Error fetching quizzes', error);
      }
    );
  }

  loadQuizDetails(): void {
    const quizId = this.route.snapshot.paramMap.get('id');

    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe(
        (quiz: Quiz) => {
          this.singleQuiz = quiz; 
        },
        (error) => {
          console.error('Error fetching quiz details:', error);
        }
      );
    } else {
      this.fetchQuizzes(); // Fallback to fetching all quizzes
    }
  }


  loadDashboardData(): void {
    this.quizService.getQuizzes().subscribe(
      quizzes => {
        this.dashboardStats[0].value = quizzes.length; // Total Quizzes
        this.dashboardStats[1].value = quizzes.filter(quiz => quiz.status === 'Active').length;
        this.dashboardStats[2].value = quizzes.filter(quiz => quiz.status === 'Inactive').length;
        this.dashboardStats[3].value = quizzes.filter(quiz => quiz.status === 'Upcoming').length;
      },
      error => {
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.bounceSubscription) {
      this.bounceSubscription.unsubscribe();
    }
  }

  // Add a getter to check if there is an active quiz
  get hasActiveQuiz(): boolean {
    return this.quizzes.some(quiz => quiz.status === 'Active');
  }
}
