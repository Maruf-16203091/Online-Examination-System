import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {
  category: string = '';
  status: string = 'Active'; // Default status
  snackBarMessage: string | null = null;

  constructor(private snackBar: MatSnackBar) { }

  saveCategory(): void {
    if (this.category.trim()) {
      // Simulate saving the category
      this.snackBar.open('Category added successfully!', 'Close', {
        duration: 9000,
        panelClass: ['custom-snack-bar'],
        horizontalPosition: 'center',
        verticalPosition: 'top', // Change to 'bottom' if you want it at the bottom
      });

      // Reset form fields
      this.category = '';
      this.status = 'Active';
    }
  }

  showSnackBar() {
    if (this.snackBarMessage) {
      this.snackBar.open(this.snackBarMessage, 'Close', {
        duration: 9000,
        panelClass: ['custom-snack-bar']
      });

      this.snackBarMessage = null; // Clear message after display
    }
  }
}
