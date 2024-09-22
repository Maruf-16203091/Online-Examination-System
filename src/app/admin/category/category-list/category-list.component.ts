import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable';  // Import the autoTable plugin
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';


export interface Category {
  category: string;
  status: string;
  action: string;
}

export interface EditDialogData {
  category: string;
  status: string;
}
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['no', 'category', 'status', 'action'];
  categories: Category[] = [
    { category: 'Mathematics', status: 'Active', action: 'edit' },
    { category: 'English', status: 'Active', action: 'edit' },
    { category: 'Science', status: 'Active', action: 'edit' }

  ];

  dataSource = new MatTableDataSource<Category>(this.categories);


  constructor(private dialog: MatDialog) {}
  ngOnInit() {
    // Data source initialization
  }

  openEditModal(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '300px',
      data: { ...category }  // Pass the selected category data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the category in the table after editing
        const index = this.categories.findIndex(c => c.category === category.category);
        if (index !== -1) {
          this.categories[index] = result;
          this.dataSource = new MatTableDataSource(this.categories); // Refresh the data
        }
      }
    });
  }

  deleteCategory(category: Category) {
    // Implement your delete logic here
    const index = this.categories.indexOf(category);
    if (index !== -1) {
      this.categories.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.categories); // Refresh the data
    }
  }


  downloadTable() {
    const doc = new jsPDF();

    // Add title to the document
    doc.text('Quiz Answers', 14, 16);

    // Define table columns
    const columns = ['Category No.', 'Category', 'Status'];

    // Define table rows based on the questions array
    const rows = this.categories.map((category, index) => [
      (index + 1).toString(),
      category.category,
      category.status
    ]);

    // Generate the table using autoTable plugin
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,  // Position the table below the title
      theme: 'grid',  // You can customize this to fit your style
      headStyles: { fillColor: '#FF6F61' }, // Header background color
    });

    // Save the PDF
    doc.save('category_list.pdf');
  }

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
