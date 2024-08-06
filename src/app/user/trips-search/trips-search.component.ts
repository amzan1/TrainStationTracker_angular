import { Component } from '@angular/core';

@Component({
  selector: 'app-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrls: ['./trips-search.component.css']
})
export class TripsSearchComponent {
  origin!: string;
  destination!: string;
  stations: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  bookTravel() {
    console.log(`Travel booked from ${this.origin} to ${this.destination}`);
  }
}
