import { Component } from '@angular/core';
import { AdminService, Trip, User } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private AdminService: AdminService) { }
  numberOfBookedTrips!: number;
  numberOfTrainStations!: number;
  numberOfActiveTrips!: number;
  numberOfUsers!: number;
  totalRevinue!: number;
  users: User[] = [];
  searchTerm: string = '';
  tripSearch:string = '';
  trips: Trip[] = [];
  upcomingTrips: any[] = [];
  stations: { [key: number]: string } = {};

  ngOnInit(): void {
    this.AdminService.getNumberOfBookedTrips().subscribe(data => this.numberOfBookedTrips = data);
    this.AdminService.getNumberOfTrainStations().subscribe(data => this.numberOfTrainStations = data);
    this.AdminService.getNumberOfActiveTrips().subscribe(data => this.numberOfActiveTrips = data);
    this.AdminService.getNumberOfUsers().subscribe(data => this.numberOfUsers = data);
    this.AdminService.getTotalRevinue().subscribe(data => this.totalRevinue = data);
    this.loadUsers();

    this.AdminService.getTrips().subscribe(data => {
      this.trips = data.filter(trip => new Date(trip.departuretime) > new Date());
    });
  }


  getStationName(id: number): string {
    return this.stations[id] || 'Unknown';
  }
  

  loadUsers() {
    this.AdminService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log('Users loaded:', this.users); // For debugging
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
}