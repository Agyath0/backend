import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { Event } from '../components/event/event.model';
import { Category } from '../components/category/category.model';
import { EventRegistration } from './event-registration.model';
// import { EventFeedback } from './event-feedback.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  categories: Category[] = [];
  events: Event[] = [];
  selectedCategoryId: number | null = null;

  showRegistrationForm = false;
  selectedEventId: number | null = null;
  registration: EventRegistration = { name: '', phone: '', email: '', eventId: 0 };

  // showFeedbackForm = false;
  // feedback: EventFeedback = { name: '', email: '', comments: '' };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCategories().subscribe(data => this.categories = data);
  }

  filterEvents(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.userService.getEventsByCategory(categoryId).subscribe(data => this.events = data);
  }

  openRegistrationForm(eventId: number) {
    this.selectedEventId = eventId;
    this.registration = { name: '', phone: '', email: '', eventId };
    this.showRegistrationForm = true;
  }

  submitRegistration() {
    this.userService.registerEvent(this.registration).subscribe(() => {
      alert('Registered successfully!');
      this.showRegistrationForm = false;
    });
  }

//   openFeedbackForm() {
//     this.feedback = { name: '', email: '', comments: '' };
//     this.showFeedbackForm = true;
//   }
//   submitFeedback() {
//     this.userService.sendFeedback(this.feedback).subscribe({
//       next: (res) => {
//         console.log('Response:', res);
//         alert(res.message || 'Feedback submitted!');
//         this.feedback = { name: '', email: '', comments: '' };
//         this.showFeedbackForm = false;
//       },
//       error: (err) => {
//         console.error('Feedback submission error:', err);
//         alert('Something went wrong. Please try again.');
//       }
//     });
//   }
//   // For Feedback Form
// cancelFeedback() {
//   this.showFeedbackForm = false;
//   this.feedback = { name: '', email: '', comments: '' };
// }

// For Registration Form
cancelRegistration() {
  this.showRegistrationForm = false;
  this.registration = { name: '', phone: '', email: '', eventId: 0 };
}
}
