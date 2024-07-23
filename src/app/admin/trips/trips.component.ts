import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService, Trip } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  constructor(private AdminService: AdminService,public dialog: MatDialog) { }
  @ViewChild('deleteDialog') CallDeleteDialog!: TemplateRef<any>;
  tripSearch: string = '';
  PrevtripSearch: string = '';

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
  openUpdateDailog(arg0: any) {
    throw new Error('Method not implemented.');
    }
}
