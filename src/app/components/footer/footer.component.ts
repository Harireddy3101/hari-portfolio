import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <footer>
      <p>&copy; 2024 Hari. All rights reserved.</p>
      <div class="social-icons">
        <a href="https://github.com/Harireddy3101" target="_blank"><fa-icon [icon]="faGithub"></fa-icon></a>
        <a href="https://www.linkedin.com/in/harivardhan-reddy-bokka/" target="_blank"><fa-icon [icon]="faLinkedin"></fa-icon></a>
        <a href="#" target="_blank"><fa-icon [icon]="faTwitter"></fa-icon></a>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
} 