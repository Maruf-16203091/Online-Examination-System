import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quiz } from '../quiz-list/quiz-list.component';

@Component({
  selector: 'app-edit-quiz-dialog',
  templateUrl: './edit-quiz-dialog.component.html',
  styleUrls: ['./edit-quiz-dialog.component.css']
})
export class EditQuizDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Quiz
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
