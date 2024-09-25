import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-examination-system';

  constructor(private router: Router) { }

  // List of routes where header and footer should not appear
  hideHeaderFooterRoutes: string[] = ['/home', '/login', '/register', '/admin-dashboard', '/admin/category-list', '/admin/category-add', '/admin/quiz-list', '/admin/quiz-add', '/admin/users'];

  // List of routes where sidenav should appear (e.g., for admin dashboard)
  adminSidenavRoutes: string[] = ['/admin-dashboard', '/admin/categories', '/admin/quizzes', '/admin/users'];

  shouldDisplayHeaderFooter(): boolean {
    // Returns true if the current route is not in the hide list
    return !this.hideHeaderFooterRoutes.includes(this.router.url);
  }

  shouldDisplaySidenav(): boolean {
    // Returns true if the current route is in the admin sidenav list
    return this.adminSidenavRoutes.some(route => this.router.url.startsWith(route));
  }
}
