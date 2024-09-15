import { Component, HostListener, OnInit  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    if (this.isScrolled) {
      document.querySelector('.header-wrapper')?.classList.add('scrolled');
    } else {
      document.querySelector('.header-wrapper')?.classList.remove('scrolled');
    }
  }
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

  training() {
    console.log('Viewing results...');
  }
  ngOnInit() {
    // Ensure the banner animation class is applied if needed
    if (this.isScrolled) {
      document.querySelector('.header-advertisement')?.classList.add('animate');
    }
  }
}
