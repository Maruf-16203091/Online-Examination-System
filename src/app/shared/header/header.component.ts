import { Component, HostListener, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'; // Import the CategoryService
import { Category } from '../../models/category.model'; // Import the Category model

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrected the property name 'styleUrls'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  categories: Category[] = []; // Declare an array to hold categories

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    if (this.isScrolled) {
      document.querySelector('.header-wrapper')?.classList.add('scrolled');
    } else {
      document.querySelector('.header-wrapper')?.classList.remove('scrolled');
    }
  }

  constructor(private categoryService: CategoryService) {} // Inject CategoryService

  ngOnInit() {
    // Fetch categories from the service on component initialization
    this.loadCategories();

    // Ensure the banner animation class is applied if needed
    if (this.isScrolled) {
      document.querySelector('.header-advertisement')?.classList.add('animate');
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data; // Assign fetched categories to the local array
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
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
}
