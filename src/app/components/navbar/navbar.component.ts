import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav>
      <div class="nav-container">
        <div class="hamburger-menu" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="nav-menu" [class.active]="isMenuOpen">
          <li><a routerLink="/home">Home</a></li>
          <li><a routerLink="/about">About</a></li>
          <li><a routerLink="/projects">Projects</a></li>
          <li><a routerLink="/contact">Contact</a></li>
        </ul>
        <button class="theme-toggle" (click)="toggleTheme()">
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isDarkMode = false;
  private darkModeSubscription?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.getCurrentMode();
    this.darkModeSubscription = this.themeService.darkMode$.subscribe(
      (isDark: boolean) => this.isDarkMode = isDark
    );
  }

  ngOnDestroy() {
    this.darkModeSubscription?.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }
} 