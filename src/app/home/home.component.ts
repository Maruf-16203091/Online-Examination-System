import { Component, HostListener, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    if (this.isScrolled) {
      document.querySelector('.header-wrapper')?.classList.add('scrolled');
    } else {
      document.querySelector('.header-wrapper')?.classList.remove('scrolled');
    }
  }

  features = [
    { icon: 'quiz', title: 'Multiple Quiz Categories', description: 'Explore a wide range of quiz categories tailored to your interests.' },
    { icon: 'emoji_events', title: 'Compete with Friends', description: 'Challenge your friends and test your knowledge against the best.' },
    { icon: 'insights', title: 'Track Your Progress', description: 'Monitor your quiz performance and improve over time.' }
  ];

  ngOnInit() {
    // Ensure the banner animation class is applied if needed
    if (this.isScrolled) {
      document.querySelector('.header-advertisement')?.classList.add('animate');
    }
  }
}
