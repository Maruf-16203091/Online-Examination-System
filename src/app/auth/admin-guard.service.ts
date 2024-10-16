import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    // Check if the user is logged in and has an admin role
    if (this.userService.isLoggedIn() && this.userService.isAdmin()) {
      return true; // Allow access if admin
    } else {
      this.router.navigate(['/login']); // Redirect to login if not admin
      return false;
    }
  }
}
