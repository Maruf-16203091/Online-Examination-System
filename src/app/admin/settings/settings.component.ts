import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  isDarkMode: boolean = false; // Default to light mode
  currentPassword: string = ''; // Current password
  newPassword: string = ''; // New password
  confirmPassword: string = ''; // Confirm new password
  selectedLanguage: string = 'en'; // Default language

  languages: string[] = ['en', 'fr', 'es', 'de']; // Language options

  // Method to toggle dark mode
  toggleDarkMode() {
    const body = document.body;
    this.isDarkMode = !this.isDarkMode; // Toggle the value
    if (this.isDarkMode) {
      body.classList.add('dark-mode'); // Add dark mode class
    } else {
      body.classList.remove('dark-mode'); // Remove dark mode class
    }
  }

  // Method to handle password change (basic validation logic)
  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
    console.log('Changing password from:', this.currentPassword, 'to:', this.newPassword);
    // Implement actual password change logic here
  }

  // Method to handle language change (placeholder logic)
  changeLanguage() {
    console.log('Language changed to:', this.selectedLanguage);
    // Implement actual language change logic here
  }
}
