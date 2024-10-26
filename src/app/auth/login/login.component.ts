import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Update the import to AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    // Simple validation
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response: any) => {
          console.log('Login successful!');
          const user = response.user; // Assuming your response has a user object

          // Check the role and redirect accordingly
          if (user.role === 'user') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/admin-dashboard']);
          }
        },
        (error) => {
          console.error('Login failed:', error.error.message || error.message);
          // Optionally, show a user-friendly error message to the user
        }
      );
    } else {
      console.error('Email and password are required.');
    }
  }


  loginWithFacebook() {
    console.log('Login with Facebook');
    // Placeholder for Facebook login logic
  }

  loginWithGoogle() {
    console.log('Login with Google');
    // Placeholder for Google login logic
  }
}
