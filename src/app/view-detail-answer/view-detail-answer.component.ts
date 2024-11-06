import { Quiz } from './../models/quiz.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ResultService } from '../services/result.service';
import { UserService } from '../services/user.service';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

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
  quizId: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private resultService: ResultService,
    private userService: UserService,
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Fetch quizId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.quizId = params.get('quizId') || '';
      console.log("Quiz ID:", this.quizId); // Add this line to confirm quizId retrieval

      const userId = this.userService.getCurrentUserId();
      if (userId && this.quizId) {
        this.fetchQuizResults(userId, this.quizId);
      }
    });
  }


  fetchQuizResults(userId: string, quizId: string) {
    this.resultService.getResultsByUserIdAndQuizId(userId, quizId).subscribe(
      (results) => {
        const quizResult = results.find((result) => result.quizId === quizId);

        if (quizResult) {
          // Populate questions array with data from quizResult
          this.questions = quizResult.userAnswers.map((answer, index) => ({
            question: answer.question,
            correctAnswer: answer.isCorrect ? answer.selectedOption : 'Incorrect',
            myAnswer: answer.selectedOption,
          }));

          // Update the dataSource with questions
          this.dataSource = new MatTableDataSource<Question>(this.questions);
          this.dataSource.paginator = this.paginator; // Attach paginator after data is populated
        }
      },
      (error) => {
        console.error('Error fetching results:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Download the table as PDF
  downloadTable() {
    const doc = new jsPDF();

    // Add title to the document
    doc.text('Quiz Answers', 14, 16);

    // Define table columns
    const columns = ['Question No.', 'Question', 'Correct Answer', 'My Answer'];

    // Define table rows based on the questions array
    const rows = this.questions.map((question, index) => [
      (index + 1).toString(),
      question.question,
      question.correctAnswer,
      question.myAnswer
    ]);

    // Generate the table using autoTable plugin
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,  // Position the table below the title
      theme: 'grid',  // Optional theme customization
      headStyles: { fillColor: '#FF6F61' }, // Header background color
    });

    // Save the PDF
    doc.save('quiz_answers.pdf');
  }

  // Print the table
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

  // Convert the data to CSV
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
