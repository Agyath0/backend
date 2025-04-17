import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sponsor } from './sponsor.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SponsorService {
  private baseUrl = 'http://localhost:8080/api/sponsors';

  constructor(private http: HttpClient) {}

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.baseUrl);
  }

  createSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(this.baseUrl, sponsor);
  }

  updateSponsor(sponsorId: number, sponsor: Sponsor): Observable<Sponsor> {
    return this.http.put<Sponsor>(`${this.baseUrl}/${sponsorId}`, sponsor);
  }

  deleteSponsor(sponsorId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${sponsorId}`);
  }
}
