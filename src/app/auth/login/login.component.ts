import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Simple validation
    if (this.email && this.password) {
      // Placeholder for actual login logic
      console.log('Login attempt with', this.email, this.password);

      // Simulate successful login
      setTimeout(() => {
        // Navigate to dashboard or desired route
        this.router.navigate(['/dashboard']);
      }, 1000); // Simulate network delay
    } else {
      // Handle empty fields
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
