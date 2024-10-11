import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { QuizService } from '../../../services/quiz.service';
import { EditQuizDialogComponent } from '../edit-quiz-dialog/edit-quiz-dialog.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Quiz, Question } from '../../../models/quiz.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../confirmation/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class AdminQuizListComponent implements OnInit {
  displayedColumns: string[] = [
    'no', 'category', 'setTime','difficulty', 'questionType',   'status', 'action'
  ];

  quizzes: Quiz[] = []; // Initialize quizzes as an empty array
  dataSource = new MatTableDataSource<Quiz>(this.quizzes);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,  private snackBar: MatSnackBar, private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuizzes(); // Load quizzes on initialization
  }

  loadQuizzes() {
    this.quizService.getQuizzes().subscribe({
      next: (quizzes: Quiz[]) => { // Specify the expected type for quizzes
        this.quizzes = quizzes;
        this.dataSource = new MatTableDataSource(this.quizzes);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching quizzes:', error); // Handle errors here
      }
    });
  }

  // EDIT Quiz
  openEditModal(quiz: Quiz): void {
    const dialogRef = this.dialog.open(EditQuizDialogComponent, {
      width: '700px',
      height: '400px',
      data: { ...quiz } // Pass the selected quiz data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.quizzes.findIndex(q => q. _id === quiz. _id); // Use id for finding the quiz
        if (index !== -1) {
          this.quizzes[index] = result; // Update the quiz
          this.dataSource = new MatTableDataSource(this.quizzes);
        }
      }
    });
  }


  loadQuiz() {
    this.quizService.getQuizzes().subscribe(
      (categories: Quiz[]) => {
        this.dataSource = new MatTableDataSource(categories);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  // DELETE Quiz
   deleteQuiz(quiz: Quiz) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete "${quiz. _id}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && quiz._id) {
        this.quizService.deleteQuiz(quiz._id).subscribe(
          () => {
            this.loadQuiz();
          },
          (error) => {
            console.error('Error deleting quiz:', error);
          }
        );
      }
    });
  }


  // PDF, Print, and CSV export functionalities...
  downloadTable() {
    const doc = new jsPDF();
    doc.text('Quiz List', 14, 16);
    const columns = ['No.', 'Category', 'Question', 'Correct Answer', 'Set Time', 'Type', 'Difficulty', 'Status'];

    const rows = this.quizzes.flatMap((quiz, quizIndex) =>
      quiz.questions.map((question) => [
        (quizIndex + 1).toString(),
        quiz.category,
        question.question,
        question.correctAnswer,
        quiz.setTime,
        quiz.difficulty,
        quiz.status
      ])
    );

    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: '#FF6F61' }
    });

    doc.save('quiz_list.pdf');
  }

  printTable() {
    const printContent = document.querySelector('table')?.outerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head><title>Print Quiz List</title></head><body>');
    printWindow?.document.write('<h2>Quiz List</h2>');
    printWindow?.document.write(printContent);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }

  // Convert to CSV format
  convertToCSV(data: Quiz[]): string {
    const csvRows: string[] = [];
    const headers = ['No.', 'Category', 'Set Time', 'Type', 'Difficulty', 'Status'];
    csvRows.push(headers.join(','));

    data.forEach((quiz, quizIndex) => {
      quiz.questions.forEach((question, questionIndex) => {
        const csvRow = [
          (quizIndex + 1).toString(),
          quiz.category,

          quiz.status
        ];
        csvRows.push(csvRow.join(','));
      });
    });

    return csvRows.join('\n');
  }

  // Download CSV
  downloadCSV() {
    const csvContent = this.convertToCSV(this.quizzes);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'quiz_list.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}

