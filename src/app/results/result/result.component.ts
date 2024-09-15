import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';   // Import jsPDF
import 'jspdf-autotable';    // Import autoTable to extend jsPDF
import { ChartOptions, ChartType, ChartData } from 'chart.js'; // Import other chart-related types

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  displayedColumns: string[] = ['category', 'attempted', 'correct', 'score'];
  dataSource: any;

  ELEMENT_DATA = [
    { category: 'Mathematics', attempted: 25, correct: 20, score: '80%' },
    { category: 'Science', attempted: 30, correct: 27, score: '90%' },
    { category: 'History', attempted: 20, correct: 16, score: '80%' },
    { category: 'General Knowledge', attempted: 15, correct: 12, score: '80%' }
  ];

  // Pie chart configuration
  public pieChartLabels: string[] = ['Correct Answers', 'Incorrect Answers'];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [85, 15], // Example values, can be dynamic
        backgroundColor: ['#388E3C', '#F44336'], // Optional: Color for each slice
      }
    ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLegend = true;

  ngOnInit() {
    this.dataSource = this.ELEMENT_DATA;

    // Dynamically calculate pie chart data based on total correct answers
    const totalQuestions = this.ELEMENT_DATA.reduce((acc, val) => acc + val.attempted, 0);
    const totalCorrect = this.ELEMENT_DATA.reduce((acc, val) => acc + val.correct, 0);
    const totalIncorrect = totalQuestions - totalCorrect;

    // Update pie chart data dynamically
    this.pieChartData.datasets[0].data = [totalCorrect, totalIncorrect];
  }

  downloadTable() {
    const doc = new jsPDF();

    // Add title to the document
    doc.text('Quiz Results', 14, 16);

    // Define table columns
    const columns = ['Category', 'Attempted', 'Correct', 'Score'];

    // Define table rows based on ELEMENT_DATA
    const rows = this.ELEMENT_DATA.map(item => [
      item.category,
      item.attempted,
      item.correct,
      item.score
    ]);

    // Use 'autoTable' to generate the table
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,  // Start position below the title
      theme: 'grid',  // Optional theme customization
      headStyles: { fillColor: '#FF6F61' }, // Table header color
    });

    // Save the PDF
    doc.save('quiz_results.pdf');
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
}
