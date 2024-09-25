import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export interface Quiz {
  category: string;
  question: string;
  status: string;
  options: string[];
  correctAnswer: string;
  setTime: number;
  questionType: string;
  difficulty: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit {

  displayedColumns: string[] = [
    'no', 'category', 'question', 'status', 'options', 'correctAnswer',
    'setTime', 'questionType', 'difficulty', 'action'
  ];

  quizzes: Quiz[] = [
    {
      category: 'Mathematics',
      question: 'What is 2+2?',
      status: 'Active',
      options: ['2', '3', '4', '5'],
      correctAnswer: '4',
      setTime: 5,
      questionType: 'Multiple Choice',
      difficulty: 'Easy'
    },
    {
      category: 'Science',
      question: 'What is the chemical formula for water?',
      status: 'Active',
      options: ['H2O', 'O2', 'CO2', 'H2'],
      correctAnswer: 'H2O',
      setTime: 10,
      questionType: 'Multiple Choice',
      difficulty: 'Medium'
    }
  ];

  dataSource = new MatTableDataSource<Quiz>(this.quizzes);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}



  // DELETE Quiz
  deleteQuiz(quiz: Quiz): void {
    const index = this.quizzes.indexOf(quiz);
    if (index !== -1) {
      this.quizzes.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.quizzes); // Refresh the table data
    }
  }

  // Existing download, print, and CSV methods here...

  // Download Table as PDF
  downloadTable() {
    const doc = new jsPDF();

    // Add title to the PDF
    doc.text('Quiz List', 14, 16);

    // Define table columns
    const columns = [
      'No.', 'Category', 'Question', 'Status', 'Options',
      'Correct Answer', 'Set Time (mins)', 'Type', 'Difficulty'
    ];

    // Define table rows based on the quizzes array
    const rows = this.quizzes.map((quiz, index) => [
      (index + 1).toString(),
      quiz.category,
      quiz.question,
      quiz.status,
      quiz.options.join(', '),
      quiz.correctAnswer,
      quiz.setTime.toString(),
      quiz.questionType,
      quiz.difficulty
    ]);

    // Generate the table using autoTable plugin
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: '#FF6F61' }, // Header background color
    });

    // Save the PDF
    doc.save('quiz_list.pdf');
  }

  // Print Table
  printTable() {
    const printContent = document.querySelector('table')?.outerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head><title>Print Quiz List</title>');
    printWindow?.document.write('</head><body>');
    printWindow?.document.write('<h2>Quiz List</h2>');
    printWindow?.document.write(printContent);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }

  // Convert to CSV format
  convertToCSV(data: Quiz[]): string {
    const csvRows: string[] = [];
    const headers = [
      'No.', 'Category', 'Question', 'Status', 'Options',
      'Correct Answer', 'Set Time (mins)', 'Type', 'Difficulty'
    ];
    csvRows.push(headers.join(',')); // Add headers

    data.forEach((quiz, index) => {
      const csvRow = [
        (index + 1).toString(),
        quiz.category,
        quiz.question,
        quiz.status,
        quiz.options.join(' | '), // Use ' | ' as a separator for options
        quiz.correctAnswer,
        quiz.setTime.toString(),
        quiz.questionType,
        quiz.difficulty
      ];
      csvRows.push(csvRow.join(','));
    });

    return csvRows.join('\n');
  }

  // Download CSV
  downloadCSV() {
    const csvContent = this.convertToCSV(this.quizzes);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quiz_list.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
