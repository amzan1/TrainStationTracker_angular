import { Component, OnInit } from '@angular/core';
import { AdminService, Trip } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  constructor(private AdminService:AdminService){}
  Reports: any;
  ReportsFilter:string = '';
  startDate!: Date;
  endDate!: Date;
  startDateT!: Date;
  endDateT!: Date;
  tripSearch:string='';
  trips: Trip[] = [];
  ngOnInit(): void {
    this.AdminService.getInitialReport().subscribe(data => this.Reports = data);
    this.AdminService.getTrips().subscribe(
      data => {
        this.trips = data;
      },
      error => {
        console.error('Error fetching trips:', error);
      }
    );
  }
  

  filterReports(){

  }
}
