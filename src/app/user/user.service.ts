import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../components/event/event.model';
import { Category } from '../components/category/category.model';
import { EventRegistration } from './event-registration.model';
// import { EventFeedback } from './event-feedback.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBase}/categories`);
  }

  getEventsByCategory(categoryId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiBase}/events/category/${categoryId}`);
  }

  registerEvent(registration: EventRegistration): Observable<any> {
    return this.http.post(`${this.apiBase}/registrations`, registration);
  }

//   sendFeedback(feedback: EventFeedback): Observable<any> {
//     return this.http.post(`${this.apiBase}/feedback`, feedback);
//   }
// sendFeedback(feedback: any): Observable<any> {
//     return this.http.post('http://localhost:8080/api/feedback', feedback);
//   }
}
