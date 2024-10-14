import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    // Simple validation
    if (this.name && this.email && this.password) {
      this.userService
        .register(this.name, this.email, this.password)
        .subscribe(
          () => console.log('Registered successfully!'),
          (error) => console.error('Registration failed:', error)
        );
    } else {
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
