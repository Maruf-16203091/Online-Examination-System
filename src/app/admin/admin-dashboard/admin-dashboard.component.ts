import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Adjust the path according to your structure
import { QuizService } from '../../services/quiz.service'; // Adjust the path according to your structure

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats = [
    { title: 'Total Quizzes', value: 0 },
    { title: 'Active Quizzes', value: 0 },
    { title: 'Inactive Quizzes', value: 0 },
    { title: 'Total Users', value: 0 },
    { title: 'Active Users', value: 0 },
    { title: 'Blocked Users', value: 0 }
  ];

  constructor(private userService: UserService, private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadDashboardData(); // Fetch the data when component initializes
  }

  loadDashboardData(): void {
    // Fetch total quizzes, active quizzes, and completed quizzes
    this.quizService.getQuizzes().subscribe(quizzes => {
      this.dashboardStats[0].value = quizzes.length; // Total Quizzes
      this.dashboardStats[1].value = quizzes.filter(quiz => quiz.status === 'Active').length; // Active Quizzes
      this.dashboardStats[2].value = quizzes.filter(quiz => quiz.status === 'Inactive').length; // Completed Quizzes
    }, error => {
      console.error('Error fetching quizzes:', error);
    });

    // Fetch total users, active users, and blocked users
    this.userService.getUsers().subscribe(users => {
      this.dashboardStats[3].value = users.length; // Total Users
      this.dashboardStats[4].value = users.filter(user => user.status).length; // Active Users
      this.dashboardStats[5].value = users.filter(user => user.blocked).length; // Blocked Users
    }, error => {
      console.error('Error fetching users:', error);
    });
  }
}
