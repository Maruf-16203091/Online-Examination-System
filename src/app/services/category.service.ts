import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { map } from 'rxjs/operators';

// Define a type for valid category keys
type CategoryKey =
  | 'Bangla'
  | 'English'
  | 'Math'
  | 'Science'
  | 'History'
  | 'General Knowledge'
  | 'Engineering'
  | 'Computer Science'
  | 'Sports'
  | 'Art';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/api/category';

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<Category[]> {
    // Use the defined CategoryKey type for keys
    const categoryIconMap: Record<CategoryKey, string> = {
      Bangla: 'language',
      English: 'book',
      Math: 'calculate',
      Science: 'science',
      History: 'history',
      'General Knowledge': 'public',
      Engineering: 'engineering',
      'Computer Science': 'computer',
      Sports: 'sports',
      Art: 'brush', // example icon
    };

    return this.http.get<Category[]>(this.apiUrl).pipe(
      map(categories => categories.map(category => ({
        ...category,
        // Cast category.category to CategoryKey
        icon: categoryIconMap[category.category as CategoryKey] || 'help' // Default icon if category not found
      })))
    );
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
