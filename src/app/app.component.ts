
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
  hideHeaderFooterRoutes: string[] = ['/home', '/login', '/register'];

  shouldDisplayHeaderFooter(): boolean {
    // Returns true if the current route is not in the hide list
    return !this.hideHeaderFooterRoutes.includes(this.router.url);
  }
}
