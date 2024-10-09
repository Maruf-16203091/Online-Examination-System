import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable';  // Import the autoTable plugin
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';
import { CategoryService } from '../../../services/category.service';  // Import your CategoryService
import { Category } from '../../../models/category.model';
import { ConfirmDialogComponent } from '../../../confirmation/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['no', 'category', 'status', 'action'];
  dataSource = new MatTableDataSource<Category>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private categoryService: CategoryService) { }

  ngOnInit() {
    // Fetch categories when the component is initialized
    this.loadCategories();
  }

  // Load categories from the backend
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.dataSource = new MatTableDataSource(categories);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Open modal for editing category
  openEditModal(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '300px',
      data: { ...category }  // Pass the selected category data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the category in the backend
        this.categoryService.updateCategory(result._id, result).subscribe(
          (updatedCategory) => {
            this.loadCategories();  // Refresh categories after update
          },
          (error) => {
            console.error('Error updating category:', error);
          }
        );
      }
    });
  }

  // Delete category using the backend API
  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete "${category.category}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && category._id) {  // If the user confirmed deletion and category has _id
        this.categoryService.deleteCategory(category._id).subscribe(
          () => {
            this.loadCategories();  // Refresh categories after delete
          },
          (error) => {
            console.error('Error deleting category:', error);
          }
        );
      }
    });
  }


  // Download table as PDF
  downloadTable() {
    const doc = new jsPDF();
    doc.text('Category List', 14, 16);
    const columns = ['Category No.', 'Category', 'Status'];
    const rows = this.dataSource.data.map((category, index) => [
      (index + 1).toString(),
      category.category,
      category.status,
    ]);
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: '#FF6F61' },
    });
    doc.save('category_list.pdf');
  }

  // Print table
  printTable() {
    const printContent = document.querySelector('table')?.outerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head><title>Print Category List</title>');
    printWindow?.document.write('</head><body >');
    printWindow?.document.write(printContent);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }

  // Convert data to CSV
  convertToCSV(data: Category[]): string {
    const csvRows: string[] = [];
    const headers = ['Category No.', 'Status'];
    csvRows.push(headers.join(','));
    data.forEach((category, index) => {
      csvRows.push(`${index + 1},${category.category},${category.status}`);
    });
    return csvRows.join('\n');
  }
}
