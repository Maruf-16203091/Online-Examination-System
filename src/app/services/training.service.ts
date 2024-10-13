import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizCategory } from '../training/training.component';

@Injectable({
  providedIn: 'root'
})



export class TrainingService {


  private apiUrl = 'http://localhost:5000/api/quizzes';

  constructor(private http: HttpClient) { }

  // Fetch filtered quizzes based on parameters
  fetchFilteredQuizzes(filters: any): Observable<QuizCategory[]> {
    let params = new HttpParams();

    if (filters.category) {
      params = params.set('category', filters.category);
    }
    if (filters.difficulty) {
      params = params.set('difficulty', filters.difficulty);
    }
    if (filters.questionType) {
      params = params.set('questionType', filters.questionType);
    }
    if (filters.dateRange) {
      params = params.set('dateRange', filters.dateRange);
    }

    return this.http.get<QuizCategory[]>(`${this.apiUrl}/filter`, { params });
  }
}
