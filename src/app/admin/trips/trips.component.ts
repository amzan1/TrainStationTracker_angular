import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService, Trip } from 'src/app/Services/admin.service';
import { CreateTripsComponent } from '../create-trips/create-trips.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  constructor(private AdminService: AdminService,public dialog: MatDialog) { }
  @ViewChild('deleteDialog') CallDeleteDialog!: TemplateRef<any>;
  @ViewChild('updateDialog') CallUpdateDialog!: TemplateRef<any>;
  startDate!: Date;
  endDate!: Date;
  tripSearch: string = '';
  PrevtripSearch: string = '';
  pData:any;
  updateForm: FormGroup = new FormGroup({
    tripid: new FormControl('', [Validators.required]),  // Added stationid control
    originstationid : new FormControl('', [Validators.required]),
    destinationstationid : new FormControl('', [Validators.required]),
    departuretime : new FormControl('', [Validators.required]),
    duratointime : new FormControl('', [Validators.required]),
    availableseats : new FormControl('', [Validators.required]),
    createdat : new FormControl('', [Validators.required]),
    price : new FormControl('', [Validators.required]),
      })

  PrevTrips: Trip[] = [];
  Upcoming: Trip[] = [];
  stations: { [key: number]: string } = {};
  stations1:any;
  filteredStationsForOrigin: any = [];
  filteredStationsForDestination: any = [];
  ngOnInit(): void {
    this.AdminService.getTrips().subscribe(data => {
      this.Upcoming = data.filter(trip => new Date(trip.departuretime) > new Date());
      this.PrevTrips = data.filter(trip => new Date(trip.departuretime) < new Date());
      console.log(this.Upcoming);
      console.log(this.PrevTrips);
    });
      this.AdminService.getAllTrainStation().subscribe(data => {
        this.stations1 = data;
        this.filteredStationsForOrigin = data;
        this.filteredStationsForDestination = data;
      });

      this.updateForm.controls['originstationid'].valueChanges.subscribe(value => {
        this.filterStations();
      });
  
      this.updateForm.controls['destinationstationid'].valueChanges.subscribe(value => {
        this.filterStations();
      });
  } 
  filterStations() {
    const originStationId = this.updateForm.controls['originstationid'].value;
    const destinationStationId = this.updateForm.controls['destinationstationid'].value;

    this.filteredStationsForOrigin = this.stations1.filter((stations1: { stationid: any; }) => stations1.stationid !== destinationStationId);
    this.filteredStationsForDestination = this.stations1.filter((stations1: { stationid: any; }) => stations1.stationid !== originStationId);
  }   
  getStationName(id: number): string {
    return this.stations[id] || 'Unknown';
  }
  openUpdateDailog(Trip: any) {
    console.log('Trip:', Trip);
    
    const dialogResult = this.dialog.open(this.CallUpdateDialog, {
      panelClass: 'custom-dialog',
      width: '80vw', // Optional: you can set the width here as well
      height: '80vh' // Optional: you can set the height here as well
    });
    this.pData = Trip;
    console.log("PData:", Trip);
    console.log(this.stations);
    

    // Ensure the form control update happens after the dialog is opened
    dialogResult.afterOpened().subscribe(() => {
      this.updateForm.controls['tripid'].setValue(this.pData.tripid);
      this.updateForm.controls['createdat'].setValue(this.pData.createdat);
      this.updateForm.controls['originstationid'].setValue(this.pData.originstationid);
      this.updateForm.controls['destinationstationid'].setValue(this.pData.destinationstationid);
      this.updateForm.controls['departuretime'].setValue(this.pData.departuretime);
      this.updateForm.controls['duratointime'].setValue(this.pData.duratointime);
      this.updateForm.controls['availableseats'].setValue(this.pData.availableseats);
      this.updateForm.controls['price'].setValue(this.pData.price);
      this.filterStations(); // Call filterStations to update options based on the initial data
      console.log("Trip ID set to:", this.pData.tripid);
    });
  }


  updateTrip() {
    console.log(this.updateForm.value);
    this.AdminService.updateTrip(this.updateForm.value);
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
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const diares = this.dialog.open(CreateTripsComponent, {
      width: '80vw', // Optional: you can set the width here as well
      height: '80vh', // Optional: you can set the height here as well
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe((res)=>{
      if(res != undefined)
      {
        if(res == 'yes')
        {

        }
        else 
        {
          console.log("Thank u");
          
        }
      }
      else 
      {
        console.log('Err');
      }
      
    })
  }
}
