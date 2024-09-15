import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable';  // Import the autoTable plugin

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
export class ViewDetailAnswerComponent implements OnInit {

  displayedColumns: string[] = ['no', 'question', 'correctAnswer', 'myAnswer'];
  questions: Question[] = [
    { question: 'What is the capital of France?', correctAnswer: 'Paris', myAnswer: 'London' },
    { question: 'What is 2 + 2?', correctAnswer: '4', myAnswer: '4' },
    { question: 'What is the color of the sky?', correctAnswer: 'Blue', myAnswer: 'Blue' },
    // Add more questions as needed
  ];

  dataSource = new MatTableDataSource<Question>(this.questions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

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
      theme: 'grid',  // You can customize this to fit your style
      headStyles: { fillColor: '#FF6F61' }, // Header background color
    });

    // Save the PDF
    doc.save('quiz_answers.pdf');
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
