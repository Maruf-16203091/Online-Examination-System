import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class ViewDetailAnswerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['no', 'question', 'correctAnswer', 'myAnswer'];
  questions: Question[] = [
    { question: 'What is the chemical symbol for water?', correctAnswer: 'H2O', myAnswer: 'H2O' },
    { question: 'What planet is known as the Red Planet?', correctAnswer: 'Mars', myAnswer: 'Mars' },
    { question: 'Who developed the theory of relativity?', correctAnswer: 'Albert Einstein', myAnswer: 'Einstein' },
    { question: 'What is the powerhouse of the cell?', correctAnswer: 'Mitochondria', myAnswer: 'Mitochondria' },
    { question: 'What gas do plants absorb from the atmosphere?', correctAnswer: 'Carbon Dioxide', myAnswer: 'Oxygen' },
    { question: 'What is the speed of light?', correctAnswer: '299,792 km/s', myAnswer: '300,000 km/s' },
    { question: 'What element is represented by the symbol Na?', correctAnswer: 'Sodium', myAnswer: 'Sodium' },
    { question: 'What organ in the human body produces insulin?', correctAnswer: 'Pancreas', myAnswer: 'Liver' },
    { question: 'What force keeps us anchored to the Earth?', correctAnswer: 'Gravity', myAnswer: 'Gravity' },
    { question: 'What is the largest organ in the human body?', correctAnswer: 'Skin', myAnswer: 'Liver' },
    { question: 'What planet is closest to the Sun?', correctAnswer: 'Mercury', myAnswer: 'Mercury' },
    { question: 'What is the chemical formula for salt?', correctAnswer: 'NaCl', myAnswer: 'NaCl' },
    { question: 'What element is the primary component of the sun?', correctAnswer: 'Hydrogen', myAnswer: 'Helium' },
    { question: 'What type of bond is found in water?', correctAnswer: 'Hydrogen Bond', myAnswer: 'Covalent Bond' },
    { question: 'What is the most abundant gas in Earth’s atmosphere?', correctAnswer: 'Nitrogen', myAnswer: 'Oxygen' },
    { question: 'What is the main source of energy for the Earth?', correctAnswer: 'Sun', myAnswer: 'Sun' },
    { question: 'What is the chemical symbol for gold?', correctAnswer: 'Au', myAnswer: 'Ag' },
    { question: 'What is the name of the process by which plants make their food?', correctAnswer: 'Photosynthesis', myAnswer: 'Respiration' },
    { question: 'What is the boiling point of water at sea level?', correctAnswer: '100°C', myAnswer: '90°C' },
    { question: 'Who is known as the father of modern physics?', correctAnswer: 'Isaac Newton', myAnswer: 'Albert Einstein' },
    { question: 'What is the second most abundant element in Earth’s crust?', correctAnswer: 'Silicon', myAnswer: 'Aluminum' }
  ];

  dataSource = new MatTableDataSource<Question>(this.questions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    // Data source initialization
  }

  ngAfterViewInit() {
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
