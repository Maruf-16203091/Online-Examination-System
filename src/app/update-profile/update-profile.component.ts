import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  selectedProfileImage: string | ArrayBuffer | null = null;
  user: User | null = null;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Initialize form without values initially
    this.updateProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', Validators.required],
      phone: ['', [Validators.required]],
      profileImage: [''],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load user data from service and patch form values
  loadUserProfile(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data: User) => {
          this.user = data;
          this.selectedProfileImage = data.profileImage || 'assets/profile/profile.jpg';
          this.updateProfileForm.patchValue({
            name: data.name,
            email: data.email,
            bio: data.bio,
            phone: data.phone,
          });
        },
        (error) => console.error('Error fetching user data:', error)
      );
    }
  }

  onSubmit(): void {
    if (this.updateProfileForm.valid) {
      const formData = new FormData();

      Object.keys(this.updateProfileForm.controls).forEach(key => {
        const value = this.updateProfileForm.get(key)?.value;
        if (value) {
          formData.append(key, value);
        }
      });

      if (this.user && this.user._id) {
        this.userService.updateUser(this.user._id, formData).subscribe(
          (response) => console.log('Profile updated successfully', response),
          (error) => console.error('Error updating profile:', error)
        );
      }
    }
  }


  // Method to preview selected image
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.updateProfileForm.patchValue({
        profileImage: file
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedProfileImage = reader.result;  // For preview
      };
      reader.readAsDataURL(file);
    }
  }


  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
