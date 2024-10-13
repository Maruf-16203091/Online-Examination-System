import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quiz, Question } from '../../../models/quiz.model';

@Component({
  selector: 'app-edit-quiz-dialog',
  templateUrl: './edit-quiz-dialog.component.html',
  styleUrls: ['./edit-quiz-dialog.component.css'],
})
export class EditQuizDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Quiz // Expecting a Quiz model here
  ) {}

  // Method to add a new question dynamically
  addNewQuestion(): void {
    const newQuestion: Question = {
      question: '',
      correctAnswer: '', // Default to Multiple Choice
      options: ['']// Comma-separated options (default empty)
    };
    this.data.questions.push(newQuestion); // Add a new blank question to the array
  }

  // Method to remove a question by its index
  removeQuestion(index: number): void {
    if (this.data.questions.length > 1) {
      this.data.questions.splice(index, 1); // Remove the question at the specified index
    } else {
      alert("A quiz must have at least one question."); // Ensure there's always at least one question
    }
  }

  // Save the quiz and close the dialog
  onSave(): void {
    // Validate data if necessary (e.g., checking empty fields or incomplete questions)
    this.dialogRef.close(this.data); // Return the updated quiz data to the parent component
  }

  // Cancel and close the dialog without saving changes
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without passing back any data
  }
}
