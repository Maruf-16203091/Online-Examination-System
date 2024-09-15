import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-quiz',
  templateUrl: './all-quiz.component.html',
  styleUrls: ['./all-quiz.component.css']
})
export class AllQuizComponent implements OnInit {
  quizzes = [
    { id: 1, title: 'Math Quiz', subject: 'Mathematics', status: 'Active' },
    { id: 2, title: 'Science Quiz', subject: 'Science', status: 'Completed' },
    { id: 3, title: 'History Quiz', subject: 'History', status: 'Upcoming' },
    { id: 4, title: 'Geography Quiz', subject: 'Geography', status: 'Active' },
    { id: 5, title: 'Technology Quiz', subject: 'Technology', status: 'Completed' }
    // Add more quizzes as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
