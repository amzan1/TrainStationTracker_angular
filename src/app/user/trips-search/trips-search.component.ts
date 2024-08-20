import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrls: ['./trips-search.component.css']
})
export class TripsSearchComponent implements OnInit {

  BookingForm: FormGroup;
  filteredStationsForOrigin: any;
  filteredStationsForDestination: any;
  stations1: any;
  trips: any;
  filteredTrips: any = [];
  minDate = new Date();
  constructor(private adminService: AdminService, private bookingService:BookingService, private router: Router) {
    this.BookingForm = new FormGroup({
      originstationid: new FormControl(''),
      destinationstationid: new FormControl(''),
      departuretime: new FormControl('', [Validators.required])
    });
  }
  bookTrip(id:number) {
    //console.log("Trip ID: "+id);
    this.bookingService.ID_Passing(id);
    this.router.navigate(['user/payment'])
  
    
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
      // const hasAvailableSeats = trip.availableseats >= 1;
  
      // Scenario 1: User chooses origin and date only
      if (origin && !destination) {
        const matchesOrigin = trip.originstationid === origin;
        return matchesDateRange && matchesOrigin;
      }
  
      // Scenario 2: User chooses destination and date only
      if (!origin && destination) {
        const matchesDestination = trip.destinationstationid === destination;
        return matchesDateRange && matchesDestination;
      }
  
      // Scenario 3: User chooses both origin, destination, and date
      if (origin && destination) {
        const matchesOrigin = trip.originstationid === origin;
        const matchesDestination = trip.destinationstationid === destination;
        return matchesDateRange && matchesOrigin && matchesDestination;
      }
  
      return false; // If no valid input scenario, exclude the trip
    });
  }
  
}

