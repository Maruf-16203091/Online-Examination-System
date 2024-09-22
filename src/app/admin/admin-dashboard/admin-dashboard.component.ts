import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats = [
    { title: 'Total Quizzes', value: 120 },
    { title: 'Total Users', value: 300 },
    { title: 'Active Quizzes', value: 80 },
    { title: 'Completed Quizzes', value: 40 },
    { title: 'Active Quizzes', value: 80 },
    { title: 'Completed Quizzes', value: 40 }
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch or calculate stats and quizzes here if needed
  }
}








