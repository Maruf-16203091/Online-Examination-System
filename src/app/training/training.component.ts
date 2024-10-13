
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from '../services/training.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Question } from '../models/quiz.model';

export interface QuizCategory {
  category: string;
  questions: Question[];
}
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  displayedColumns: string[] = ['questions', 'Answer'];
  dataSource = new MatTableDataSource<QuizCategory>();

  selectedCategory = new FormControl('');
  selectedDifficulty = new FormControl('');
  selectedDateRange = new FormControl('');
  selectedQuestionType = new FormControl('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categories: Category[] = []; // Loaded from the DB
  difficultyLevels: string[] = ['Easy', 'Medium', 'Hard'];
  dateRanges: string[] = ['Last 7 Days', 'Last 30 Days', 'Last 6 Months', 'Last Year'];
  questionTypes: string[] = ['Multiple Choice', 'True False', 'Short Question'];

  constructor(
    private trainingService: TrainingService,
    private categoryService: CategoryService // Inject CategoryService
  ) { }

  ngOnInit() {
    this.loadCategories(); // Fetch categories from the backend
    this.applyFilter(); // Fetch initial data on load

    // Subscribe to form control value changes to dynamically filter data
    this.selectedCategory.valueChanges.subscribe(() => this.applyFilter());
    this.selectedDifficulty.valueChanges.subscribe(() => this.applyFilter());
    this.selectedDateRange.valueChanges.subscribe(() => this.applyFilter());
    this.selectedQuestionType.valueChanges.subscribe(() => this.applyFilter());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Load categories from the CategoryService
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  // Apply filters and fetch data from the service
  applyFilter() {
    const filters = {
      category: this.selectedCategory.value,
      difficulty: this.selectedDifficulty.value,
      dateRange: this.selectedDateRange.value,
      questionType: this.selectedQuestionType.value
    };

    this.trainingService.fetchFilteredQuizzes(filters).subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching filtered quizzes', error);
      }
    );
  }
}
