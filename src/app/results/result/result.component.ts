import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  // Define displayed columns for the table
  displayedColumns: string[] = ['category', 'attempted', 'correct', 'score'];

  // Declare dataSource without initializing
  dataSource: any;

  // Define the data for the table
  ELEMENT_DATA = [
    { category: 'Mathematics', attempted: 25, correct: 20, score: '80%' },
    { category: 'Science', attempted: 30, correct: 27, score: '90%' },
    { category: 'History', attempted: 20, correct: 16, score: '80%' },
    { category: 'General Knowledge', attempted: 15, correct: 12, score: '80%' }
  ];

  ngOnInit() {
    // Initialize dataSource in ngOnInit
    this.dataSource = this.ELEMENT_DATA;
  }
}
