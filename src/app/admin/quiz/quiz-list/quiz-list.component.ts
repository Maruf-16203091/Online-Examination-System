import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EditQuizDialogComponent } from '../edit-quiz-dialog/edit-quiz-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

export interface Quiz {
  category: string;          // Category of the quiz
  status: string;           // Status of the quiz (e.g., Active, Inactive)
  questions: Question[];    // Array of questions for this quiz
  setTime: number;          // Total time allocated for the quiz
  questionType: string;     // Type of questions (e.g., Multiple Choice)
  difficulty: string;       // Difficulty level of the quiz
}

export interface Question {
  questionText: string;     // Text of the question
  options: string[];        // Possible answer options
  correctAnswers: string[]; // Array of correct answers

}




@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})

export class AdminQuizListComponent implements OnInit {


  displayedColumns: string[] = [
    'no', 'category', 'setTime', 'questionType','question', 'options', 'correctAnswer', 'difficulty', 'status', 'action'
  ];



  quizzes: Quiz[] = [
    {
      category: 'Mathematics',
      status: 'Active',
      setTime: 10,
      questionType: 'Multiple Choice',
      difficulty: 'Easy',
      questions: [
        {
          questionText: 'What is 2+2?',
          options: ['2', '3', '4', '5'],
          correctAnswers: ['4']

        },
        {
          questionText: 'What is 3+5?',
          options: ['7', '8', '9', '10'],
          correctAnswers: ['8'],

        }
      ]
    },



  ];


  dataSource = new MatTableDataSource<Quiz>(this.quizzes);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  // EDIT Quiz
  openEditModal(quiz: Quiz): void {
    const dialogRef = this.dialog.open(EditQuizDialogComponent, {
      width: '700px',
      height: '400px',
      data: { ...quiz } // Pass the selected quiz data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.quizzes.findIndex(q => q.category === quiz.category);
        if (index !== -1) {
          this.quizzes[index] = result;
          this.dataSource = new MatTableDataSource(this.quizzes);
        }
      }
    });
  }

  // DELETE Quiz
  deleteQuiz(quiz: Quiz): void {
    const index = this.quizzes.indexOf(quiz);
    if (index !== -1) {
      this.quizzes.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.quizzes); // Refresh the table data
    }
  }

  // PDF, Print, and CSV export functionalities are updated to handle multiple questions.

  // Download Table as PDF
  downloadTable() {
    const doc = new jsPDF();

    doc.text('Quiz List', 14, 16);
    const columns = ['No.', 'Category', 'Question', 'Options', 'Correct Answer', 'Set Time', 'Type', 'Difficulty', 'Status'];

    const rows = this.quizzes.flatMap((quiz, quizIndex) =>
      quiz.questions.map((question, questionIndex) => [
        (quizIndex + 1).toString(),
        quiz.category,
        question.questionText,
        question.options.join(', '),
        question.correctAnswers.join(', '),

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

  // Print Table
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
    const headers = ['No.', 'Category', 'Question', 'Options', 'Correct Answer', 'Set Time', 'Type', 'Difficulty', 'Status'];
    csvRows.push(headers.join(','));

    data.forEach((quiz, quizIndex) => {
      quiz.questions.forEach((question, questionIndex) => {
        const csvRow = [
          (quizIndex + 1).toString(),
          quiz.category,
          question.questionText,
          question.options.join(' | '),
          question.correctAnswers.join(' | '),

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
