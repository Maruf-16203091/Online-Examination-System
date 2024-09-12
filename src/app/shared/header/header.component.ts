import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  goToProfile() {
    console.log('Navigating to profile...');
  }

  updateProfile() {
    console.log('Updating profile...');
  }

  logout() {
    console.log('Logging out...');
  }

  filterByCategory(category: string) {
    console.log(`Filtering quizzes by category: ${category}`);
  }

  goToQuiz() {
    console.log('Navigating to quiz...');
  }

  viewResults() {
    console.log('Viewing results...');
  }
}
