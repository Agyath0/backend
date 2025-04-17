import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venue } from './venue.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VenueService {
  private baseUrl = 'http://localhost:8080/api/venues';

  constructor(private http: HttpClient) {}

  getVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.baseUrl);
  }

  createVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(this.baseUrl, venue);
  }

  updateVenue(venueId: number, venue: Venue): Observable<Venue> {
    return this.http.put<Venue>(`${this.baseUrl}/${venueId}`, venue);
  }

  deleteVenue(venueId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${venueId}`);
  }
}
