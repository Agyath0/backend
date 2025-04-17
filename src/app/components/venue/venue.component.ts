import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueService } from './venue.service';
import { Venue } from './venue.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  venues: Venue[] = [];
  venueForm: FormGroup;
  editingVenueId: number | null = null;

  constructor(private venueService: VenueService, private fb: FormBuilder) {
    this.venueForm = this.fb.group({
      venueId: ['', Validators.required],
      location: ['', Validators.required],
      capacity: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues() {
    this.venueService.getVenues().subscribe(data => this.venues = data);
  }

  onSubmit() {
    const venue: Venue = this.venueForm.value;

    if (this.editingVenueId) {
      this.venueService.updateVenue(this.editingVenueId, venue).subscribe(() => {
        this.loadVenues();
        this.resetForm();
      });
    } else {
      this.venueService.createVenue(venue).subscribe(() => {
        this.loadVenues();
        this.resetForm();
      });
    }
  }

  editVenue(venue: Venue) {
    this.venueForm.setValue({
      venueId: venue.venueId,
      location: venue.location,
      capacity: venue.capacity
    });
    this.editingVenueId = venue.venueId ?? null;
  }

  deleteVenue(venueId: number | undefined) {
    if (!venueId) return;
    this.venueService.deleteVenue(venueId).subscribe(() => this.loadVenues());
  }

  resetForm() {
    this.venueForm.reset();
    this.editingVenueId = null;
  }
}
