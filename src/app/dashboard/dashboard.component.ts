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

  // Method to navigate to the profile page
  goToProfile() {
    console.log('Navigating to profile...');
    // Implement navigation logic here
  }

  // Method to update profile
  updateProfile() {
    console.log('Updating profile...');
    // Implement update profile logic here
  }

  // Method to logout
  logout() {
    console.log('Logging out...');
    // Implement logout logic here
  }

  // Method to filter quizzes by category
  filterByCategory(category: string) {
    console.log(`Filtering quizzes by category: ${category}`);
    // Implement category filtering logic here
  }

  // Method to navigate to the quiz page
  goToQuiz() {
    console.log('Navigating to quiz...');
    // Implement navigation to quiz page here
  }

  // Method to view results
  viewResults() {
    console.log('Viewing results...');
    // Implement navigation to results page here
  }

  // Method to navigate to types of quiz
  goToTypesOfQuiz() {
    console.log('Navigating to types of quiz...');
    // Implement navigation to types of quiz page here
  }
}
