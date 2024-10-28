import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private apiUrl = 'http://localhost:5000/api/results';

  constructor(private http: HttpClient) { }

  // Fetch all results for a user
  getResultsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Fetch detailed result by resultId
  getResultById(resultId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${resultId}`);
  }
}
