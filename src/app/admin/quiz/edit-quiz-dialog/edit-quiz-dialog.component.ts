import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-quiz-dialog',
  templateUrl: './edit-quiz-dialog.component.html',
})
export class EditQuizDialogComponent {
  category: any[]; // Define categories property to hold category data

  constructor(
    public dialogRef: MatDialogRef<EditQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Ensure to type this according to your model
  ) {
    // Initialize categories if you have them in the data object
    this.category = data.categories || []; // Assign categories from data if available
  }

  // Add a new question
  addNewQuestion() {
    this.data.quizQuestions.push({
      question: '',
      correctAnswer: '',
      questionType: 'Multiple Choice',
      options: ''
    });
  }

  // Remove a specific question
  removeQuestion(index: number) {
    this.data.quizQuestions.splice(index, 1);
  }

  // Handle the Save action
  onSave() {
    // Implement your save logic here
    this.dialogRef.close(this.data); // Return the updated data
  }

  // Handle the Cancel action
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
