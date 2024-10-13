import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/api/category';

  constructor(private http: HttpClient) { }

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Create a new category
  createCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Category>(this.apiUrl, category, { headers });
  }

  // Update an existing category
  updateCategory(id: string, category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category, { headers });
  }

  // Delete a category by ID
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
