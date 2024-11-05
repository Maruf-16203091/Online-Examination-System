import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { UserService } from '../../services/user.service'; // Import UserService to get user info
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

// Define the UserAnswer interface
export interface UserAnswer {
  question: string;           // The text of the question
  selectedOption: string;     // The option chosen by the user
  isCorrect: boolean;         // Indicates if the user's answer was correct
}

// Define the Result interface
export interface Result {
  userId: string;            // Reference to the User ID
  quizId: string;            // Reference to the Quiz ID
  category: string;          // The category of the quiz
  correctAnswers: number;    // Number of correct answers
  incorrectAnswers: number;  // Number of incorrect answers
  totalQuestions: number;    // Total questions in the quiz
  score: number;             // User's score
  percentage: number;        // Percentage score
  userAnswers: UserAnswer[]; // Array of user answers
  attemptDate: Date;         // Date of the quiz attempt
  createdAt?: Date;          // Optional created at timestamp
  updatedAt?: Date;          // Optional updated at timestamp
}

interface AggregatedResult {
  category: string;
  attempted: number;
  correctAnswers: number;
  score: number;            // Total score for the aggregated results
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  displayedColumns: string[] = ['category', 'attempted', 'correct', 'score'];
  dataSource: AggregatedResult[] = []; // Initialize as empty array

  // Pie chart configuration
  public pieChartLabels: string[] = ['Correct Answers', 'Incorrect Answers'];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [0, 0], // Initialize with zeros, will update dynamically
        backgroundColor: ['#388E3C', '#F44336'],
      }
    ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLegend = true;

  // Additional properties to store total score and percentage
  totalScore: number = 0;
  totalQuestions: number = 0;
  percentage: number = 0;

  constructor(private resultService: ResultService, private userService: UserService) { }

  ngOnInit() {
    const userId = this.userService.getCurrentUserId(); // Fetch userId from UserService
    if (userId) {
      this.resultService.getResultsByUserId(userId).subscribe(
        (results: Result[]) => {
          // Aggregate results by category
          this.dataSource = this.aggregateResultsByCategory(results);

          // Calculate total correct answers and total questions
          this.totalScore = this.dataSource.reduce((acc, val) => acc + val.correctAnswers, 0);
          this.totalQuestions = this.dataSource.reduce((acc, val) => acc + val.attempted, 0);
          this.percentage = this.totalQuestions > 0 ? (this.totalScore / this.totalQuestions) * 100 : 0;

          // Update pie chart data based on total correct answers
          const totalIncorrect = this.totalQuestions - this.totalScore;
          this.pieChartData.datasets[0].data = [this.totalScore, totalIncorrect];

          // Ensure the pie chart updates when data changes
          this.pieChartData = { ...this.pieChartData }; // Trigger change detection
        },
        error => {
          console.error('Error fetching results:', error);
        }
      );
    }
  }

  // Function to aggregate results by category
  aggregateResultsByCategory(results: Result[]): AggregatedResult[] {
    const aggregated: AggregatedResult[] = results.reduce((acc, result) => {
      const existing = acc.find(item => item.category === result.category);
      if (existing) {
        existing.attempted += result.totalQuestions; // Summing attempted questions
        existing.correctAnswers += result.correctAnswers; // Summing correct answers
        existing.score += result.score; // Aggregate score logic
      } else {
        acc.push({
          category: result.category,
          attempted: result.totalQuestions,
          correctAnswers: result.correctAnswers,
          score: result.score,
        });
      }
      return acc;
    }, [] as AggregatedResult[]);

    return aggregated;
  }

  downloadTable() {
    const doc = new jsPDF();

    // Add title to the document
    doc.text('Quiz Results', 14, 16);

    // Define table columns
    const columns = ['Category', 'Attempted', 'Correct', 'Score'];

    // Define table rows based on dataSource
    const rows = this.dataSource.map(item => [
      item.category,
      item.attempted,
      item.correctAnswers,
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
