import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardStats = [
    { title: 'Total Quizzes', value: 24 },
    { title: 'Active Quizzes', value: 6 },
    { title: 'Upcoming Quizzes', value: 4 },
    { title: 'Completed Quizzes', value: 14 }
  ];

  quizzes = [  // Sample quizzes data
    { id: 1, title: 'Math Quiz', subject: 'Mathematics', status: 'Active' },
    { id: 2, title: 'Science Quiz', subject: 'Science', status: 'Completed' },
    { id: 3, title: 'History Quiz', subject: 'History', status: 'Upcoming' }
  ];

  isBouncing = false;
  bounceSubscription!: Subscription;

  ngOnInit() {
    this.bounceSubscription = timer(0, 10000).subscribe(() => {
      this.isBouncing = true;
      setTimeout(() => this.isBouncing = false, 1000);
    });
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
