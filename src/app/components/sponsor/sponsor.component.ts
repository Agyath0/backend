import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorService } from './sponsor.service';
import { Sponsor } from './sponsor.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sponsor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  sponsors: Sponsor[] = [];
  sponsorForm: FormGroup;
  editingSponsorId: number | null = null;

  constructor(private sponsorService: SponsorService, private fb: FormBuilder) {
    this.sponsorForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadSponsors();
  }

  loadSponsors() {
    this.sponsorService.getSponsors().subscribe(data => this.sponsors = data);
  }

  onSubmit() {
    const sponsor: Sponsor = this.sponsorForm.value;

    if (this.editingSponsorId) {
      this.sponsorService.updateSponsor(this.editingSponsorId, sponsor).subscribe(() => {
        this.loadSponsors();
        this.resetForm();
      });
    } else {
      this.sponsorService.createSponsor(sponsor).subscribe(() => {
        this.loadSponsors();
        this.resetForm();
      });
    }
  }

  editSponsor(sponsor: Sponsor) {
    this.sponsorForm.setValue({
      name: sponsor.name,
      description: sponsor.description
    });
    this.editingSponsorId = sponsor.sponsorId ?? null;
  }

  deleteSponsor(sponsorId: number | undefined) {
    if (!sponsorId) return;
    this.sponsorService.deleteSponsor(sponsorId).subscribe(() => this.loadSponsors());
  }

  resetForm() {
    this.sponsorForm.reset();
    this.editingSponsorId = null;
  }
}
