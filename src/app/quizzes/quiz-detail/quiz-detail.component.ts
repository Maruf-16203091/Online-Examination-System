import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model'; // Import your Quiz model

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css'] // Fixed typo
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz | undefined; 
  quizInstructions: string = 'Please read the following instructions carefully before starting the quiz.';

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadQuizDetails();
  }

  loadQuizDetails(): void {
    const quizId = this.route.snapshot.paramMap.get('id');

    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe(
        (quiz) => {
          this.quiz = quiz; // Store the entire quiz object
        },
        (error) => {
          console.error('Error fetching quiz details:', error);
        }
      );
    }
  }

  startQuiz() {
    console.log('Quiz started!');
  }
}
