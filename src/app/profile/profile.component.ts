import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    name: 'Md Maruf Hosen',
    email: 'maruf.hosen@example.com',
    bio: 'My name is Md Maruf Hosen, and I am currently pursuing an MSc at Technische Universität Chemnitz. Alongside my studies, I work as a web developer at Bosch Rexroth, where I contribute to innovative web solutions and applications.',
    profilePicture: 'assets/profile/profile.jpg'
  };

  constructor() { }

  ngOnInit(): void {
  }
}
