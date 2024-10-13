import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../models/quiz.model';

@Component({
  selector: 'app-all-quiz',
  templateUrl: './all-quiz.component.html',
  styleUrls: ['./all-quiz.component.css']
})
export class AllQuizComponent implements OnInit {
  quizzes: Quiz[] = [];  // Store the fetched quizzes here

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.fetchQuizzes();
  }

  fetchQuizzes(): void {
    this.quizService.getQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Error fetching quizzes', error);
      }
    );
  }
}
