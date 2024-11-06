import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model'; // Make sure this matches your actual result model

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private apiUrl = 'http://localhost:5000/api/results'; // Adjust based on your backend URL

  constructor(private http: HttpClient) { }

  // Get results by userId and quizId
  getResultsByUserIdAndQuizId(userId: string, quizId: string): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/user/${userId}/quiz/${quizId}`);
  }

  // Get results by userId (if needed for other purposes)
  getResultsByUserId(userId: string): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/${userId}`);
  }
}
