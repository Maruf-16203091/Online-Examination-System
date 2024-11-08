import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ResultService } from '../../../services/result.service';


export interface Result {
  userName: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: string;  // in minutes or time format
  date: string;       // date of the quiz
}

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  displayedColumns: string[] = [
    'no', 'userName', 'quizTitle', 'category', 'score',
    'totalQuestions', 'correctAnswers', 'timeTaken', 'date', 'action'
  ];

  results: Result[] = [
    {
      userName: 'John Doe',
      quizTitle: 'Math Quiz',
      category: 'Mathematics',
      score: 8,
      totalQuestions: 10,
      correctAnswers: 8,
      timeTaken: '5 mins',
      date: '2024-09-20'
    },
    {
      userName: 'Jane Smith',
      quizTitle: 'Science Quiz',
      category: 'Science',
      score: 7,
      totalQuestions: 10,
      correctAnswers: 7,
      timeTaken: '7 mins',
      date: '2024-09-21'
    }
  ];

  dataSource = new MatTableDataSource<Result>();

  constructor(private resultService: ResultService) { }


  ngOnInit(): void {
    this.fetchResults();  // Call fetchResults to load data from backend
  }

  fetchResults(): void {
    this.resultService.getAllResults().subscribe(
      (results: Result[]) => {
        this.dataSource.data = results;  // Assign data to dataSource for dynamic table rendering
      },
      (error) => {
        console.error('Error fetching results:', error);
      }
    );
  }

  // Generate PDF for individual user result
  generatePDF(result: Result): void {
    const doc = new jsPDF();

    // Add title
    doc.text('Quiz Result', 14, 16);

    // Add user details
    const userDetails = [
      ['User Name', result.userName],
      ['Quiz Title', result.quizTitle],
      ['Category', result.category],
      ['Score', result.score + '/' + result.totalQuestions],
      ['Correct Answers', result.correctAnswers.toString()],
      ['Time Taken', result.timeTaken],
      ['Date', result.date]
    ];

    (doc as any).autoTable({
      head: [['Field', 'Details']],
      body: userDetails,
      startY: 20,
      theme: 'grid'
    });

    // Save the PDF
    doc.save(`${result.userName}_quiz_result.pdf`);
  }

  // Send Email with result in PDF
  sendResultEmail(result: Result): void {
    // Generate PDF first
    this.generatePDF(result);

    // Email functionality here (integrate with backend for real email sending)
    alert(`Sending result email to: ${result.userName}`);
  }

  // Download the complete table as PDF
  downloadResultsTable(): void {
    const doc = new jsPDF();
    doc.text('All Quiz Results', 14, 16);

    const columns = [
      'No.', 'User Name', 'Quiz Title', 'Category', 'Score',
      'Total Questions', 'Correct Answers', 'Time Taken', 'Date'
    ];

    const rows = this.results.map((result, index) => [
      (index + 1).toString(),
      result.userName,
      result.quizTitle,
      result.category,
      result.score.toString(),
      result.totalQuestions.toString(),
      result.correctAnswers.toString(),
      result.timeTaken,
      result.date
    ]);

    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: '#FF6F61' },
    });

    doc.save('all_quiz_results.pdf');
  }
}
