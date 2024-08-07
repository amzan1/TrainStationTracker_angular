import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrls: ['./trips-search.component.css']
})
export class TripsSearchComponent implements OnInit {
  BookingForm: FormGroup;
  filteredStationsForOrigin: any;
  filteredStationsForDestination: any;
  stations1:any;

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

    this.BookingForm.controls['originstationid'].valueChanges.subscribe(() => {
      this.filterStations();
    });

    this.BookingForm.controls['destinationstationid'].valueChanges.subscribe(() => {
      this.filterStations();
    });
  }

  filterStations() {
    const originStationId = this.BookingForm.controls['originstationid'].value;
    const destinationStationId = this.BookingForm.controls['destinationstationid'].value;

    this.filteredStationsForOrigin = this.stations1.filter((station1: { stationid: any; }) => station1.stationid !== destinationStationId);
    this.filteredStationsForDestination = this.stations1.filter((station1: { stationid: any; }) => station1.stationid !== originStationId);
  }

  bookTravel() {
    if (this.BookingForm.valid) {
      const origin = this.BookingForm.controls['originstationid'].value;
      const destination = this.BookingForm.controls['destinationstationid'].value;
      const departureDate = this.BookingForm.controls['departuretime'].value;
      console.log(departureDate)
      console.log(`Travel booked from ${origin} to ${destination} on ${departureDate}`);
    }
  }
}
