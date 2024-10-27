import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'; // Import the tap operator
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  // Function to log in user
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('role', response.user.role);
        } else {
          console.error('Invalid login response:', response);
        }
      }),
      catchError(error => {
        console.error('Login error:', error); // Log any error during the login
        return of(null); // Return null to indicate failure
      })
    );
  }



  // Logout method - clear token and redirect to home
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/home']);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists
  }

  // Get user role from localStorage
  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }


  // Get current user ID
  getCurrentUserId(): string | null {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user)._id : null;
    console.log('User object:', user); // Log the user object
    console.log('Current User ID:', userId); // Log the user ID
    return userId;
  }

}
