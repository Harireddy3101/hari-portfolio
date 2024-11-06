import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <section id="projects">
      <div class="projects-container" data-aos="fade-up">
        <h2>My Projects</h2>
        <div class="project-grid">
          @for (project of projects; track project.title) {
            <app-project-card [project]="project" />
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: var(--text-color);
    }

    .project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    @media (max-width: 768px) {
      .project-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with Angular and TypeScript',
      technologies: ['Angular', 'TypeScript', 'CSS'],
      githubUrl: 'https://github.com/yourusername/portfolio',
      liveUrl: 'https://yourportfolio.com'
    },
    // Add more projects here
  ];
} 