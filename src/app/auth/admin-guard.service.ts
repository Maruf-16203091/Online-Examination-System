import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Import UserService

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      // Add additional admin role check here if needed
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
