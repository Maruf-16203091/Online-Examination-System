import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data: User) => {
          this.user = data;
        },
        (error) => console.error('Error loading user profile:', error)
      );
    }
  }
}
