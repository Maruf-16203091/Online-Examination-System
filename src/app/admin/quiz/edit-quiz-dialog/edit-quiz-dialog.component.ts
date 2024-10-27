import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quiz, Question } from '../../../models/quiz.model';
import { CategoryService } from '../../../services/category.service'; // Import the CategoryService
import { Category } from '../../../models/category.model'; // Import the Category model

@Component({
  selector: 'app-edit-quiz-dialog',
  templateUrl: './edit-quiz-dialog.component.html',
  styleUrls: ['./edit-quiz-dialog.component.css'],
})
export class EditQuizDialogComponent implements OnInit {
  categories: Category[] = []; // Store the fetched categories

  constructor(
    public dialogRef: MatDialogRef<EditQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Quiz,
    private categoryService: CategoryService // Inject CategoryService
  ) { }

  ngOnInit(): void {
    // Fetch categories on initialization
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories; // Assign the fetched categories to the component
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  addNewQuestion(): void {
    const newQuestion: Question = {
      question: '',
      correctAnswer: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
    };
    this.data.questions.push(newQuestion);
  }

  removeQuestion(index: number): void {
    if (this.data.questions.length > 1) {
      this.data.questions.splice(index, 1);
    } else {
      alert('A quiz must have at least one question.');
    }
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
