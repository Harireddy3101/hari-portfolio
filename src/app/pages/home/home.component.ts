import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home">
      <div class="profile-container" data-aos="fade-up">
        <div class="profile-image-container">
          <img 
            src="/assets/profile.jpeg" 
            (error)="handleImageError($event)" 
            alt="Profile Picture" 
            class="profile-picture">
        </div>
        <h1>Welcome to My Portfolio</h1>
        <p>Hari Reddy Bokka &#64; Web Developer & Designer</p>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  handleImageError(event: any) {
    console.error('Image failed to load');
    event.target.src = '/assets/default-profile.jpeg';
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true
      });
    }
  }
} 