import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import { Quiz } from '../../../models/quiz.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.css'],
})
export class AdminQuizAddComponent implements OnInit {
  category: string = '';
  status: string = 'Active';
  setTime: string = '';
  difficulty: string = '';
  questionType: string = 'Multiple Choice';
  categories: Category[] = [];

  quizQuestions: { question: string; correctAnswer: string; option_1: string; option_2: string; option_3: string; option_4: string; }[] = [
    { question: '', correctAnswer: '', option_1: '', option_2: '', option_3: '', option_4: '' },
  ];

  snackBarMessage: string | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private quizService: QuizService,
    private categoryService: CategoryService // Inject CategoryService
  ) { }

  // Lifecycle hook to initialize component and load categories
  ngOnInit(): void {
    this.loadCategories(); // Load categories when component is initialized
  }

  // Fetch categories from the backend
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response; // Store categories for the dropdown
      },
      (error) => {
        this.snackBarMessage = 'Error loading categories. Please try again.';
        this.showSnackBar();
      }
    );
  }

  // Add a new question
  addNewQuestion(): void {
    this.quizQuestions.push({ question: '', correctAnswer: '', option_1: '', option_2: '', option_3: '', option_4: '' });
  }

  // Remove a question from the list
  removeQuestion(index: number): void {
    this.quizQuestions.splice(index, 1);
  }

  // Save the entire quiz
  saveQuiz(): void {
    if (this.category && this.quizQuestions.length > 0 && this.quizQuestions.every(q => q.question && q.correctAnswer)) {
      const quizData: Quiz = {
        category: this.category,
        status: this.status,
        questionType: this.questionType,
        setTime: this.setTime,
        difficulty: this.difficulty,
        questions: this.quizQuestions,

      }; +

        this.quizService.createQuiz(quizData).subscribe(
          (response) => {
            this.snackBarMessage = 'Quiz added successfully!';
            this.showSnackBar();

            // Reset form fields after saving
            this.resetForm();
          },
          (error) => {
            this.snackBarMessage = 'Error adding quiz. Please try again.';
            this.showSnackBar();
          }
        );
    } else {
      // Show an error message if required fields are not filled
      this.snackBarMessage = 'Please fill in all the required fields!';
      this.showSnackBar();
    }
  }

  // Reset the form fields
  resetForm(): void {
    this.category = '';
    this.status = 'Active';
    this.setTime = '';
    this.difficulty = '';
    this.questionType = 'Multiple Choice';
    this.quizQuestions = [{ question: '', correctAnswer: '', option_1: '', option_2: '', option_3: '', option_4: '' }];
  }

  // Show the snackbar for notifications
  showSnackBar(): void {
    if (this.snackBarMessage) {
      this.snackBar.open(this.snackBarMessage, 'Close', {
        duration: 3000,
        panelClass: ['custom-snack-bar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.snackBarMessage = null; // Clear the message after displaying
    }
  }
}
