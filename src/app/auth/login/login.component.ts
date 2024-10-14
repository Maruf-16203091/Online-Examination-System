import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }
  onLogin() {
    // Simple validation
    if (this.email && this.password) {
      this.userService
        .login(this.email, this.password)
        .subscribe(
          () => console.log('Login successful!'),
          (error) => console.error('Login failed:', error)
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
