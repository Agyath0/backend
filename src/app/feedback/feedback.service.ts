// src/app/feedback/feedback.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from './feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
}
