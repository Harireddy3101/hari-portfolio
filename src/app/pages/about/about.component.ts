import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about-section">
      <div class="about-content" data-aos="fade-up">
        <h2>About Me</h2>
        <p>I am a passionate web developer with expertise in modern web technologies.</p>
        <div class="skills">
          <h3>Skills</h3>
          <ul>
            <li>Angular</li>
            <li>TypeScript</li>
            <li>HTML/CSS</li>
            <li>JavaScript</li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {} 