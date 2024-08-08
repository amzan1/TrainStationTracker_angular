import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrls: ['./trips-search.component.css']
})
export class TripsSearchComponent implements OnInit {
bookTrip(id:number) {
  console.log("Trip ID: "+id);
  
}
  BookingForm: FormGroup;
  filteredStationsForOrigin: any;
  filteredStationsForDestination: any;
  stations1: any;
  trips: any;
  filteredTrips: any = [];

  constructor(private adminService: AdminService) {
    this.BookingForm = new FormGroup({
      originstationid: new FormControl('', [Validators.required]),
      destinationstationid: new FormControl('', [Validators.required]),
      departuretime: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.adminService.getAllTrainStation().subscribe(data => {
      this.stations1 = data;
      this.filteredStationsForOrigin = data;
      this.filteredStationsForDestination = data;
    });

    this.adminService.getTrips().subscribe(data => {
      this.trips = data;
    });

    this.BookingForm.controls['originstationid'].valueChanges.subscribe(() => {
      this.filterStations();
      this.filterTrips();

    });

    this.BookingForm.controls['departuretime'].valueChanges.subscribe(() => {
      this.filterStations();
      this.filterTrips();
    });

    this.BookingForm.controls['destinationstationid'].valueChanges.subscribe(() => {
      this.filterStations();
      this.filterTrips();
    });
  }

  filterStations() {
    const originStationId = this.BookingForm.controls['originstationid'].value;
    const destinationStationId = this.BookingForm.controls['destinationstationid'].value;

    this.filteredStationsForOrigin = this.stations1.filter((station1: { stationid: any; }) => station1.stationid !== destinationStationId);
    this.filteredStationsForDestination = this.stations1.filter((station1: { stationid: any; }) => station1.stationid !== originStationId);
  }

  filterTrips() {
    const origin = this.BookingForm.controls['originstationid'].value;
    const destination = this.BookingForm.controls['destinationstationid'].value;
    const departureDate = this.BookingForm.controls['departuretime'].value;
  
    if (!departureDate) {
      // If departure date is not provided, do not proceed
      return;
    }
  
    const targetDate = new Date(departureDate);
    const endDate = new Date(targetDate);
    endDate.setDate(targetDate.getDate() + 3);
  
    this.filteredTrips = this.trips.filter((trip: any) => {
      const tripDate = new Date(trip.departuretime);
      const matchesDateRange = tripDate >= targetDate && tripDate <= endDate;
      const matchesOrigin = origin ? trip.originstationid === origin : true;
      const matchesDestination = destination ? trip.destinationstationid === destination : true;
      const hasAvailableSeats = trip.availableseats >= 1;
  
      return matchesDateRange && (matchesOrigin || matchesDestination) && hasAvailableSeats;
    });
  }
}

