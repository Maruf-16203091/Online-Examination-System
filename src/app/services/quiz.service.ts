import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:5000/api/quizzes'; 

  constructor(private http: HttpClient) { }

  // Method to get quizzes from the backend
  getQuizzes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
