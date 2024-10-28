import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable to extend jsPDF
import { ChartOptions, ChartType, ChartData } from 'chart.js'; // Import other chart-related types
import { ResultService } from '../../services/result.service'; // Import the service to fetch result data
import { ActivatedRoute } from '@angular/router'; // To get query params like resultId

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  displayedColumns: string[] = ['category', 'attempted', 'correct', 'score'];
  dataSource: any = []; // Initialize dataSource as empty array
  resultId: string = ''; // To store the resultId if passed as a query param

  // Variables to hold dynamic results data
  totalScore: number = 0; // Total score from results
  percentage: number = 0; // Percentage from results
  timeTaken: string = ''; // Time taken from results

  // Pie chart configuration
  public pieChartLabels: string[] = ['Correct Answers', 'Incorrect Answers'];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [0, 0], // Initial values, will be updated dynamically
        backgroundColor: ['#388E3C', '#F44336'], // Colors for correct/incorrect
      }
    ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLegend = true;

  constructor(private resultService: ResultService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get resultId from query params if available
    this.route.queryParams.subscribe(params => {
      this.resultId = params['resultId'];
      if (this.resultId) {
        this.loadResult(this.resultId);
      }
    });
  }

  // Method to load the quiz result from the backend
  loadResult(resultId: string) {
    this.resultService.getResultById(resultId).subscribe(result => {
      // Assuming result is returned in the following format:
      // { correctAnswers: 85, wrongAnswers: 15, totalQuestions: 100, timeTaken: '35 minutes', categories: [...] }
      this.totalScore = result.correctAnswers + result.wrongAnswers; // Calculate total score
      this.percentage = (result.correctAnswers / this.totalScore) * 100; // Calculate percentage
      this.timeTaken = result.timeTaken;

      const totalQuestions = result.totalQuestions;
      const totalCorrect = result.correctAnswers;
      const totalIncorrect = result.wrongAnswers;

      // Update pie chart data dynamically based on fetched result
      this.pieChartData.datasets[0].data = [totalCorrect, totalIncorrect];

      // Update table dataSource with category-wise performance
      this.dataSource = result.categories.map((category: { category: string; attempted: number; correct: number; score: string }) => ({
        category: category.category,
        attempted: category.attempted,
        correct: category.correct,
        score: category.score
      }));
    });
  }

  downloadTable() {
    const doc = new jsPDF();

    // Add title to the document
    doc.text('Quiz Results', 14, 16);

    // Define table columns
    const columns = ['Category', 'Attempted', 'Correct', 'Score'];

    // Define table rows based on the dynamically loaded dataSource
    const rows = this.dataSource.map((item: any) => [
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
