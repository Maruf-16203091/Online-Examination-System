import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  displayedColumns: string[] = ['category', 'description', 'questions'];
  dataSource = new MatTableDataSource<QuizCategory>(ELEMENT_DATA);
  searchTerm = new FormControl('');
  selectedCategory = new FormControl('');
  selectedDifficulty = new FormControl('');
  selectedDateRange = new FormControl('');
  selectedQuestionType = new FormControl('');
  categories: string[] = ['Mathematics', 'Science', 'History', 'General Knowledge'];
  difficultyLevels: string[] = ['Easy', 'Medium', 'Hard'];
  dateRanges: string[] = ['Last 7 Days', 'Last 30 Days', 'Last 6 Months', 'Last Year'];
  questionTypes: string[] = ['Multiple Choice', 'True/False', 'Short Answer'];
  sampleQuestions = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
    // Add more sample questions here
  ];

  constructor() {}

  ngOnInit() {
    // Subscribe to form control value changes to filter data
    this.selectedCategory.valueChanges.subscribe(() => this.applyFilter());
    this.selectedDifficulty.valueChanges.subscribe(() => this.applyFilter());
    this.selectedDateRange.valueChanges.subscribe(() => this.applyFilter());
    this.selectedQuestionType.valueChanges.subscribe(() => this.applyFilter());
  }

  applyFilter() {
    const categoryValue = this.selectedCategory.value || '';
    const difficultyValue = this.selectedDifficulty.value || '';
    const dateRangeValue = this.selectedDateRange.value || '';
    const questionTypeValue = this.selectedQuestionType.value || '';

    this.dataSource.filterPredicate = (data: QuizCategory, filter: string) => {
      const matchesCategory = categoryValue ? data.category === categoryValue : true;
      const matchesDifficulty = difficultyValue ? data.difficulty === difficultyValue : true;
      // Add logic for date range and question type filters if needed
      return matchesCategory && matchesDifficulty;
    };

    this.dataSource.filter = '';  // Trigger filterPredicate update
  }
}

export interface QuizCategory {
  category: string;
  description: string;
  questions: number;
  difficulty: string;
}

const ELEMENT_DATA: QuizCategory[] = [
  { category: 'Mathematics', description: 'Algebra, Geometry, Calculus', questions: 25, difficulty: 'Easy' },
  { category: 'Science', description: 'Physics, Chemistry, Biology', questions: 30, difficulty: 'Medium' },
  { category: 'History', description: 'Ancient, Medieval, Modern', questions: 20, difficulty: 'Hard' },
  { category: 'General Knowledge', description: 'Current Affairs, World Facts', questions: 15, difficulty: 'Medium' },
  // Add more dummy data here
];
