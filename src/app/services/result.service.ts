import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private apiUrl = 'http://localhost:5000/api/results';

  constructor(private http: HttpClient) { }


  getAllResults(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}`);
  }
  // Get results by userId and quizId
  getResultsByUserIdAndQuizId(userId: string, quizId: string): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/user/${userId}/quiz/${quizId}`);
  }

  // Get results by userId 
  getResultsByUserId(userId: string): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/${userId}`);
  }

  getResultByUserAndQuiz(userId: string, quizId: string): Observable<Result> {
    return this.http.get<Result>(`${this.apiUrl}/user/${userId}/quiz/${quizId}`);
  }
}
