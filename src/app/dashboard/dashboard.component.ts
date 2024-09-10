// dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Sample data for cards
  dashboardStats = [
    { title: 'Total Quizzes', value: 24 },
    { title: 'Active Quizzes', value: 6 },
    { title: 'Upcoming Quizzes', value: 4 },
    { title: 'Completed Quizzes', value: 14 }
  ];

  // Sample quiz data
  quizzes = [
    { id: 1, title: 'Math Quiz', subject: 'Mathematics', status: 'Active' },
    { id: 2, title: 'Science Quiz', subject: 'Science', status: 'Completed' },
    { id: 3, title: 'History Quiz', subject: 'History', status: 'Upcoming' }
  ];
}
