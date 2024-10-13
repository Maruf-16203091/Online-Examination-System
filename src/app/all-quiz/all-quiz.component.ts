import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service'; // Assuming you have a QuizService
import { Quiz } from '../models/quiz.model'; // Assuming you have a Quiz model

@Component({
  selector: 'app-all-quiz',
  templateUrl: './all-quiz.component.html',
  styleUrls: ['./all-quiz.component.css']
})
export class AllQuizComponent implements OnInit {
  category: string = '';
  quizzes: Quiz[] = [];

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit() {
    // Get category from the route params
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.filterQuizzesByCategory(this.category);
    });
  }

  filterQuizzesByCategory(category: string) {
    this.quizService.getQuizzes().subscribe(
      (data: Quiz[]) => {
        // Filter quizzes by category on the frontend
        this.quizzes = data.filter(quiz => quiz.category === category);
      },
      (error) => {
        console.error('Error fetching quizzes', error);
      }
    );
  }

}
