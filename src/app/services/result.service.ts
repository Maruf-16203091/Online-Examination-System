import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model'; // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private apiUrl = 'http://localhost:5000/api/results'; // Adjust based on your backend URL

  constructor(private http: HttpClient) { }

  getResultsByUserId(userId: string): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/${userId}`);
  }
}
