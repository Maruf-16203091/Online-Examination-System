import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ResultService } from '../services/result.service';
import { UserService } from '../services/user.service';

export interface Question {
  question: string;
  correctAnswer: string;
  myAnswer: string;
}

@Component({
  selector: 'app-view-detail-answer',
  templateUrl: './view-detail-answer.component.html',
  styleUrls: ['./view-detail-answer.component.css']
})
export class ViewDetailAnswerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'question', 'correctAnswer', 'myAnswer'];
  questions: Question[] = [];
  dataSource = new MatTableDataSource<Question>(this.questions);
  isLoading: boolean = false; // Loading indicator

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private resultService: ResultService,
    private userService: UserService,
    private snackBar: MatSnackBar // Inject MatSnackBar service
  ) { }

  ngOnInit() {
    // Fetch the current user’s results when the component initializes
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.fetchQuizResults(userId);
    }
  }

  fetchQuizResults(userId: string) {
    this.isLoading = true;
    this.resultService.getResultsByUserId(userId).subscribe(
      (results) => {
        console.log('Results from API:', results);
        this.isLoading = false;

        // Assuming `results` is an array of quizzes; combine all questions into a single list
        this.questions = results.flatMap(quizResult =>
          quizResult.userAnswers.map((answer, index) => ({
            question: answer.question,
            correctAnswer: answer.isCorrect ? answer.selectedOption : 'Incorrect',
            myAnswer: answer.selectedOption,
          }))
        );

        // Update the dataSource with questions and attach paginator
        this.dataSource = new MatTableDataSource<Question>(this.questions);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching results:', error);
        this.snackBar.open('No quiz results yet', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  downloadTable() {
    const doc = new jsPDF();
    doc.text('Quiz Answers', 14, 16);
    const columns = ['Question No.', 'Question', 'Correct Answer', 'My Answer'];
    const rows = this.questions.map((question, index) => [
      (index + 1).toString(),
      question.question,
      question.correctAnswer,
      question.myAnswer
    ]);

    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: '#FF6F61' }
    });

    doc.save('quiz_answers.pdf');

    // Show confirmation message after download
    this.snackBar.open('PDF downloaded successfully', 'Close', {
      duration: 3000,
    });
  }

  downloadCSV() {
    const csvContent = this.convertToCSV(this.questions);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz_answers.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    this.snackBar.open('CSV downloaded successfully', 'Close', {
      duration: 3000,
    });
  }

  printTable() {
    const printContent = document.querySelector('table')?.outerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head><title>Print Quiz Details</title>');
    printWindow?.document.write('</head><body >');
    printWindow?.document.write(printContent);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }

  convertToCSV(data: Question[]): string {
    const csvRows: string[] = [];
    const headers = ['Question No.', 'Question', 'Correct Answer', 'My Answer'];
    csvRows.push(headers.join(','));

    data.forEach((question, index) => {
      csvRows.push(`${index + 1},${question.question},${question.correctAnswer},${question.myAnswer}`);
    });

    return csvRows.join('\n');
  }
}
