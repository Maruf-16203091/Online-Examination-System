import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string, type: string } // Add 'type' here
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
