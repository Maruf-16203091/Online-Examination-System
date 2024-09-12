import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  selectedSortBy = new FormControl('');
  selectedRating = new FormControl('');

  categories: string[] = ['Mathematics', 'Science', 'History', 'General Knowledge'];
  difficultyLevels: string[] = ['Easy', 'Medium', 'Hard'];
  dateRanges: string[] = ['Last 7 Days', 'Last 30 Days', 'Last 6 Months', 'Last Year'];
  questionTypes: string[] = ['Multiple Choice', 'True/False', 'Short Answer'];

  // New filter options
  sortOptions: string[] = ['Alphabetical', 'Number of Questions', 'Difficulty'];
  ratings: string[] = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

  sampleQuestions = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
    // Add more sample questions here
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor() {}

  ngOnInit() {
    // Subscribe to form control value changes to filter data
    this.selectedCategory.valueChanges.subscribe(() => this.applyFilter());
    this.selectedDifficulty.valueChanges.subscribe(() => this.applyFilter());
    this.selectedDateRange.valueChanges.subscribe(() => this.applyFilter());
    this.selectedQuestionType.valueChanges.subscribe(() => this.applyFilter());
    this.selectedSortBy.valueChanges.subscribe(() => this.applyFilter());
    this.selectedRating.valueChanges.subscribe(() => this.applyFilter());

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    const categoryValue = this.selectedCategory.value || '';
    const difficultyValue = this.selectedDifficulty.value || '';
    const dateRangeValue = this.selectedDateRange.value || '';
    const questionTypeValue = this.selectedQuestionType.value || '';
    const sortByValue = this.selectedSortBy.value || '';
    const ratingValue = this.selectedRating.value || '';

    this.dataSource.filterPredicate = (data: QuizCategory, filter: string) => {
      const matchesCategory = categoryValue ? data.category === categoryValue : true;
      const matchesDifficulty = difficultyValue ? data.difficulty === difficultyValue : true;

      return matchesCategory && matchesDifficulty;
    };

    this.dataSource.filter = ''; // Trigger filter refresh
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
  { category: 'Mathematics', description: 'Probability, Statistics', questions: 28, difficulty: 'Hard' },
  { category: 'Science', description: 'Astronomy, Earth Science', questions: 35, difficulty: 'Easy' },
  { category: 'History', description: 'World Wars, Cold War', questions: 18, difficulty: 'Medium' },
  { category: 'General Knowledge', description: 'Geography, Capitals', questions: 22, difficulty: 'Easy' },
  { category: 'Mathematics', description: 'Number Theory, Set Theory', questions: 24, difficulty: 'Medium' },
  { category: 'Science', description: 'Genetics, Microbiology', questions: 32, difficulty: 'Hard' },
  { category: 'History', description: 'Renaissance, Industrial Revolution', questions: 27, difficulty: 'Easy' },
  { category: 'General Knowledge', description: 'Inventions, Discoveries', questions: 19, difficulty: 'Medium' },
  { category: 'Mathematics', description: 'Linear Algebra, Matrices', questions: 20, difficulty: 'Medium' },
  { category: 'Science', description: 'Quantum Physics, Relativity', questions: 26, difficulty: 'Hard' },
  { category: 'History', description: 'French Revolution, Napoleonic Wars', questions: 25, difficulty: 'Hard' },
  { category: 'General Knowledge', description: 'Famous Personalities', questions: 16, difficulty: 'Easy' },
  { category: 'Mathematics', description: 'Trigonometry, Vectors', questions: 23, difficulty: 'Easy' },
  { category: 'Science', description: 'Botany, Zoology', questions: 30, difficulty: 'Medium' },
  { category: 'History', description: 'Colonialism, Nationalism', questions: 29, difficulty: 'Medium' },
  { category: 'General Knowledge', description: 'Sports, Olympics', questions: 14, difficulty: 'Medium' },
  { category: 'Mathematics', description: 'Differential Equations', questions: 31, difficulty: 'Hard' },
  { category: 'Science', description: 'Environmental Science, Ecology', questions: 24, difficulty: 'Easy' },
  { category: 'History', description: 'Civil Rights Movements', questions: 21, difficulty: 'Medium' },
  { category: 'General Knowledge', description: 'Currencies, Economies', questions: 18, difficulty: 'Hard' }
];

