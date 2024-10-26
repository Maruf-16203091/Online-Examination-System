import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    { title: 'Upcoming Quizzes', value: 0 },
    { title: 'Total Users', value: 0 },
    { title: 'Active Users', value: 0 },
    { title: 'Blocked Users', value: 0 }
  ];

  constructor(private userService: UserService, private quizService: QuizService, private authService: AuthService, // Inject AuthService for authentication actions
    private router: Router) { }

  ngOnInit(): void {
    this.loadDashboardData(); // Fetch the data when component initializes
  }

  loadDashboardData(): void {
    // Fetch total quizzes, active quizzes, and completed quizzes
    this.quizService.getQuizzes().subscribe(quizzes => {
      this.dashboardStats[0].value = quizzes.length; // Total Quizzes
      this.dashboardStats[1].value = quizzes.filter(quiz => quiz.status === 'Active').length; // Active Quizzes
      this.dashboardStats[2].value = quizzes.filter(quiz => quiz.status === 'Inactive').length;
      this.dashboardStats[3].value = quizzes.filter(quiz => quiz.status === 'Upcoming').length;
    }, error => {
      console.error('Error fetching quizzes:', error);
    });

    // Fetch total users, active users, and blocked users
    this.userService.getUsers().subscribe(users => {
      this.dashboardStats[4].value = users.length; // Total Users
      this.dashboardStats[5].value = users.filter(user => user.status).length; // Active Users
      this.dashboardStats[6].value = users.filter(user => user.blocked).length; // Blocked Users
    }, error => {
      console.error('Error fetching users:', error);
    });
  }

  logout() {
    this.authService.logout(); // Call logout from AuthService
    this.router.navigate(['/login']); // Navigate to login page after logging out
    console.log('Logging out...');
  }
}
