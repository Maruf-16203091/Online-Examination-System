import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  // Function to log in user
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).subscribe(
      (response: any) => {
        const { token, user } = response;

        // Store token and user details, including the role
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.role);

        // Check the role and redirect accordingly
        if (user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }


  // Logout method - clear token and redirect to home
  logout() {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user'); // Optionally remove user data as well
    this.router.navigate(['/home']); // Redirect to home page
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
}
