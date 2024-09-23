import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.css']
})
export class AdminQuizAddComponent {

  category: string = '';
  question: string = '';
  status: string = 'Active';
  options: string[] = [];
  correctAnswer: string = '';
  setTime: number = 0;
  questionType: string = '';
  difficulty: string = '';
  snackBarMessage: string | null = null;

  constructor(private snackBar: MatSnackBar) { }

  saveQuiz(): void {
    if (this.status.trim()) {
      // Simulate saving the Quiz
      this.snackBarMessage = 'Quiz added successfully!';
      this.showSnackBar();

      // Reset form fields after saving

      this.category = '';
      this.status = 'Active';
      this.options = [];
      this.correctAnswer = '';
      this.setTime = 0;
      this.questionType = '';
      this.difficulty = '';
    } else {
      // Show an error message if quiz is empty
      this.snackBarMessage = 'Please fill in the required fields!';
      this.showSnackBar();
    }
  }

  showSnackBar(): void {
    if (this.snackBarMessage) {
      this.snackBar.open(this.snackBarMessage, 'Close', {
        duration: 9000, // 3 seconds duration
        panelClass: ['custom-snack-bar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.snackBarMessage = null; // Clear the message after displaying
    }
  }
}
