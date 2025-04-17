import { Time } from "@angular/common";

export interface Category {
  categoryId: number;
  description: string;
}

export interface Venue {
  venueId: number;
  location: string;
}

export interface Sponsor {
  sponsorId: number;
  name: string;
}

export interface Event {
  eventId: number;
  name: string;
  date: string;
  description: string;
  time: string;
  category: Category;
  venue: Venue;
  sponsor: Sponsor;
}
