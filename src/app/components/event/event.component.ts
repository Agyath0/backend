import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from './event.service';
import { Event } from './event.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  eventForm: FormGroup;
  editingEventId: number | null = null;
  selectedEventId: number | null = null;
  selectedRegistrations: any[] = [];
  toastMessage: string = '';
  showRegTable: boolean = false;

  constructor(private eventService: EventService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
      venue: ['', Validators.required],
      sponsor: ['', Validators.required]
    });
    
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(data => this.events = data);
  }
  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = '', 3000);
  }
  onSubmit() {
    const formValue = this.eventForm.value;
  
    const event: Event = {
      eventId: this.editingEventId ?? 0, // optional, backend might auto-generate
      name: formValue.name,
      description: formValue.description,
      date: formValue.date,
      time: formValue.time,
      category: { categoryId: formValue.category, description: '' }, // description is optional here
      venue: { venueId: formValue.venue, location: '' },
      sponsor: { sponsorId: formValue.sponsor, name: '' }
    };
  
    if (this.editingEventId) {
      this.eventService.updateEvent(this.editingEventId, event).subscribe(() => {
        this.loadEvents();
        this.resetForm();
        this.showToast('Event updated successfully!');
      });
    } else {
      this.eventService.createEvent(event).subscribe(() => {
        this.loadEvents();
        this.resetForm();
        this.showToast('Event created successfully!');
      });
    }
  }
  

  editEvent(event: Event) {
    this.eventForm.setValue({
      name: event.name,
      description: event.description,
      time: event.time,
      date: event.date,
      category: event.category.categoryId,
      sponsor: event.sponsor.sponsorId,
      venue: event.venue.venueId
    });
    this.editingEventId = event.eventId;
  }

  deleteEvent(eventId: number | undefined) {
    if (eventId === undefined || eventId === null) {
      console.error('Event ID is invalid:', eventId);
      return;
    }
  
    this.eventService.deleteEvent(eventId).subscribe(() => {
      console.log('Event deleted:', eventId);
      this.loadEvents();
      this.showToast('Event deleted successfully!');
    });
  }

  showRegistrations(eventId: number) {
    this.eventService.getRegistrationsByEvent(eventId).subscribe(data => {
      this.selectedRegistrations = data;
      this.showRegTable = true; // Optional flag for toggling display
    });
  }
  
  
  clearRegistrations() {
    this.selectedEventId = null;
    this.selectedRegistrations = [];
    this.showRegTable = false;
  }
  
  

  resetForm() {
    this.eventForm.reset();
    this.editingEventId = null;
  }
}
