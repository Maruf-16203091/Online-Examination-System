import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js'; // Updated ChartData import

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

  // The 'data' object should now be an array of datasets.
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
}
