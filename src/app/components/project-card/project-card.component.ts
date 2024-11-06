import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="project-card" data-aos="fade-up">
      @if (project.imageUrl) {
        <img [src]="project.imageUrl" [alt]="project.title" class="project-image">
      }
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      @if (project.technologies) {
        <div class="technologies">
          @for (tech of project.technologies; track tech) {
            <span class="tech-tag">{{ tech }}</span>
          }
        </div>
      }
      <div class="project-links">
        @if (project.githubUrl) {
          <a [href]="project.githubUrl" target="_blank" rel="noopener" class="github-link">
            GitHub
          </a>
        }
        @if (project.liveUrl) {
          <a [href]="project.liveUrl" target="_blank" rel="noopener" class="live-link">
            Live Demo
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .project-card {
      background-color: var(--card-bg-color);
      border-radius: var(--border-radius);
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
    }

    .project-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0;
    }

    .tech-tag {
      background-color: var(--primary-color);
      color: var(--background-color);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
    }

    .project-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .project-links a {
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .github-link {
      background-color: var(--secondary-color);
      color: var(--background-color);
    }

    .live-link {
      background-color: var(--primary-color);
      color: var(--background-color);
    }
  `]
})
export class ProjectCardComponent {
  @Input() project!: Project;
} 