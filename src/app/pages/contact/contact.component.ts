import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact">
      <div class="contact-container" data-aos="fade-up">
        <h2>Contact Me</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <input type="text" placeholder="Name" [(ngModel)]="formData.name" name="name" required>
          </div>
          <div class="form-group">
            <input type="email" placeholder="Email" [(ngModel)]="formData.email" name="email" required>
          </div>
          <div class="form-group">
            <textarea placeholder="Message" [(ngModel)]="formData.message" name="message" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  `,
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Add your form submission logic here
  }
} 