import { Quiz } from '../models/quiz.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from '../services/result.service';
import { UserService } from '../services/user.service'; // Import UserService for fetching the current user ID
import { Result } from '../models/result.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  quizzes: Quiz[] = [];
  completedQuizzes: Quiz[] = []; // To store quizzes with completed status
  dashboardStats = [
    { title: 'Total Quizzes', value: 0 },
    { title: 'Active Quizzes', value: 0 },
    { title: 'Upcoming Quizzes', value: 0 }
  ];

  private userId: string = '';
  private bounceSubscription!: Subscription;

  constructor(
    private quizService: QuizService,
    private resultService: ResultService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.userService.getCurrentUserId() || '';
    this.fetchQuizzes();
    this.loadDashboardData();
  }

  fetchQuizzes(): void {
    this.quizService.getQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
        this.updateQuizStats();
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
      }
    );
  }


  loadDashboardData() {
    this.quizService.getQuizzes().subscribe(
      quizzes => {
        this.dashboardStats[0].value = quizzes.length;
        this.dashboardStats[1].value = quizzes.filter(quiz => quiz.status === 'Active').length;
        this.dashboardStats[3].value = quizzes.filter(quiz => quiz.status === 'Upcoming').length;
      },
      error => console.error('Error fetching dashboard data', error)
    );
  }

  updateQuizStats(): void {
    this.dashboardStats[0].value = this.quizzes.length;
    this.dashboardStats[1].value = this.quizzes.filter(quiz => quiz.status === 'Active').length;
    this.dashboardStats[3].value = this.quizzes.filter(quiz => quiz.status === 'Upcoming').length;
  }

  ngOnDestroy() {
    if (this.bounceSubscription) {
      this.bounceSubscription.unsubscribe();
    }
  }
}
