import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://localhost:5000/api/quizzes';

  constructor(private http: HttpClient) { }

  // Method to get all quizzes
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  // Method to get a single quiz by ID
  getQuizById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }


  // Method to create a new quiz
  createQuiz(quiz: Quiz): Observable<Quiz> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Quiz>(this.apiUrl, quiz, { headers });
  }

  // Method to update an existing quiz
  updateQuiz(id: string, quiz: Quiz): Observable<Quiz> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Quiz>(`${this.apiUrl}/${id}`, quiz, { headers });
  }

  // Method to delete a quiz by ID
  deleteQuiz(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
