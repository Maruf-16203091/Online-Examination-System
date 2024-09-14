import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  user = {
    name: 'Md Maruf Hosen',
    email: 'maruf.hosen@example.com',
    bio: 'Web Developer at Bosch Rexroth.',
    contactNumber: '+491234567890',
    profilePicture: 'assets/profile/profile.jpg'
  };
  selectedProfileImage: string | ArrayBuffer | null = this.user.profilePicture;

  // Track visibility for password fields
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.updateProfileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      bio: [this.user.bio, Validators.required],
      contactNumber: [this.user.contactNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      profilePicture: [null],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.updateProfileForm.valid) {
      const updatedUser = this.updateProfileForm.value;
      console.log('Profile updated', updatedUser);
    }
  }

  // Method to preview selected image
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedProfileImage = reader.result;
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
