// src/app/feedback/feedback.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Feedback } from './feedback.model';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedback: Feedback = {
    name: '',
    email: '',
    comments: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private feedbackService: FeedbackService) {}

  submitFeedback() {
    this.successMessage = '';
    this.errorMessage = '';

    this.feedbackService.submitFeedback(this.feedback).subscribe(
      () => {
        this.successMessage = 'Feedback submitted successfully!';
        this.resetForm();
      },
      () => {
        this.errorMessage = 'Error submitting feedback. Please try again.';
      }
    );
  }

  resetForm() {
    this.feedback = {
      name: '',
      email: '',
      comments: ''
    };
  }
}
