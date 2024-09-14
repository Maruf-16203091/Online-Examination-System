import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onRegister() {
    // Simple validation
    if (this.name && this.email && this.password) {
      // Placeholder for actual registration logic
      console.log('Registration attempt with', this.name, this.email, this.password);

      // Simulate successful registration
      setTimeout(() => {
        // Navigate to login or desired route
        this.router.navigate(['/login']);
      }, 1000); // Simulate network delay
    } else {
      // Handle empty fields
      console.error('Name, email, and password are required.');
    }
  }

  registerWithFacebook() {
    console.log('Register with Facebook');
    // Placeholder for Facebook registration logic
  }

  registerWithGoogle() {
    console.log('Register with Google');
    // Placeholder for Google registration logic
  }
}
