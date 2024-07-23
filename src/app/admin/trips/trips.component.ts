import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService, Trip } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  constructor(private AdminService: AdminService, public dialog: MatDialog) { }

  @ViewChild('deleteDialog') CallDeleteDialog!: TemplateRef<any>;
  @ViewChild('updateDialog') CallUpdateDialog!: TemplateRef<any>;

  tripSearch: string = '';
  PrevtripSearch: string = '';
  pData: any;
  updateForm: FormGroup = new FormGroup({
    tripid: new FormControl('', [Validators.required]),
    originstationid: new FormControl('', [Validators.required]),
    destinationstationid: new FormControl('', [Validators.required]),
    departuretime: new FormControl('', [Validators.required]),
    durationtime: new FormControl('', [Validators.required]),
    availableseats: new FormControl('', [Validators.required]),
    createdat: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  PrevTrips: Trip[] = [];
  Upcoming: Trip[] = [];
  stations: { [key: number]: string } = {};

  ngOnInit(): void {
    this.AdminService.getTrips().subscribe(data => {
      this.Upcoming = data.filter(trip => new Date(trip.departuretime) > new Date());
      this.PrevTrips = data.filter(trip => new Date(trip.departuretime) < new Date());
      console.log(this.Upcoming);
      console.log(this.PrevTrips);
    });
  }

  getStationName(id: number): string {
    return this.stations[id] || 'Unknown';
  }

  openUpdateDialog(Trip: any) {
    console.log('Trip:', Trip);

    const dialogResult = this.dialog.open(this.CallUpdateDialog);
    this.pData = Trip;
    console.log("PData:", Trip);

    // Ensure the form control update happens after the dialog is opened
    dialogResult.afterOpened().subscribe(() => {
      this.updateForm.controls['tripid'].setValue(this.pData.tripid);
      this.updateForm.controls['createdat'].setValue(this.pData.createdat);
      this.updateForm.patchValue(this.pData); // Patch all values
      console.log("Trip ID set to:", this.pData.tripid);
    });
  }

  updateTrip() {
    if (this.updateForm.valid) {
      const updatedTrip = this.updateForm.value;
      console.log('Updated Trip:', updatedTrip);
      // Call your update service here with updatedTrip
    }
  }
  openDeleteDialog(id: number) {
    const dialogResult =
      this.dialog.open(this.CallDeleteDialog);
    dialogResult.afterClosed().subscribe((res) => {
      if (res != undefined) {
        if (res == 'yes')
          this.AdminService.DeleteTrip(id)
        else
          console.log('Thank you');
      }
      else {
        console.log("Err");
      }
    });
  }
}
