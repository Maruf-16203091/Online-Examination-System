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
    email: 'maruf.hosen@example.com', // Default email, can be dynamically fetched
    profilePicture: 'assets/images/profile-picture.jpg'
  };

  constructor(private fb: FormBuilder) {
    this.updateProfileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      profilePicture: [this.user.profilePicture]
    });
  }

  ngOnInit(): void {
    // Optionally fetch user data from a service
  }

  onSubmit(): void {
    if (this.updateProfileForm.valid) {
      // Here you would typically send the form data to a server
      const updatedUser = this.updateProfileForm.value;
      console.log('Profile updated', updatedUser);
      // For demonstration, we just log it
    }
  }
}
