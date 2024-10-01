import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent {
  category: string = '';
  status: string = 'Active';
  snackBarMessage: string | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private categoryService: CategoryService  
  ) {}

  // Save the new category
  saveCategory(): void {
    if (this.category.trim()) {
      const newCategory: Category = {
        category: this.category,
        status: this.status,
      };

      // Call the service to save the category
      this.categoryService.createCategory(newCategory).subscribe(
        (response) => {
          // Show success message when category is successfully added
          this.snackBar.open('Category added successfully!', 'Close', {
            duration: 9000,
            panelClass: ['custom-snack-bar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          // Reset form fields
          this.category = '';
          this.status = 'Active';
        },
        (error) => {
          // Handle error and show error message
          this.snackBar.open('Failed to add category. Try again.', 'Close', {
            duration: 9000,
            panelClass: ['custom-snack-bar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }
}
