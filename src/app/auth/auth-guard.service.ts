import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';  // Assumes the UserService handles authentication logic

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);  // Redirect to login page if user is not logged in
      return false;
    }
  }
}
