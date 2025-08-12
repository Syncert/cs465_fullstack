import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit{
  // @Input('trip') trip: any; why this change?
    @Input('trip') trip!: Trip;
    @Output() removed = new EventEmitter<string>(); //emit trip.code when deleted
    deleting = false;

  constructor(private router: Router, private tripData: TripData) {}

  ngOnInit(): void {

  }
  
  // Navigate to the Edit Trip page.
  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  //Delete the trip
  public onDeleteClick(trip: Trip) {
    if (!trip?.code) return;
    if (!confirm(`Delete "${trip.name}"? This cannot be undone.`)) return;

    this.deleting = true;
    this.tripData.deleteTrip(trip.code).subscribe({
      next: () => {
        this.deleting = false;
        this.removed.emit(trip.code); // tell parent to remove from list
      },
      error: (err) => {
        this.deleting = false;
        alert('Failed to delete trip: ' + (err?.error?.message ?? err.message ?? 'Unknown error'));
      }
    });
  }
}