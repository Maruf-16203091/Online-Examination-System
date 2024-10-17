import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';  // Assuming you have a User model

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';  // CRUD operations API URL
  private authUrl = 'http://localhost:5000/api/auth';  // Authentication API URL

  constructor(private http: HttpClient, private router: Router) { }

  /** ==========================
   *  User Management (CRUD)
   *  ==========================
   */

  // Get all users (Admin only)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Get a single user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Create a new user (Register)
  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  // Update an existing user
  updateUser(id: string, user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  // Delete a user by ID (Admin)
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /** ==========================
   *  Authentication (Login/Register)
   *  ==========================
   */

  // Register a new user (same as createUser)
  register(name: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name, email, password };

    return this.http.post(`${this.authUrl}/register`, body, { headers }).pipe(
      tap((response: any) => {
        // Store token in local storage
        localStorage.setItem('token', response.token);
        // Navigate to login or dashboard after successful registration
        this.router.navigate(['/login']);
      })
    );
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post(`${this.authUrl}/login`, body, { headers }).pipe(
      tap((response: any) => {
        // Store token in local storage
        localStorage.setItem('token', response.token);
        // Navigate to dashboard or desired route
        this.router.navigate(['/dashboard']);
      })
    );
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Return true if token exists
  }

  isAdmin(): boolean {
    const userRole = localStorage.getItem('role');
    return userRole === 'admin';  
  }


  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Method to log out user
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Method to retrieve the token for API requests
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
