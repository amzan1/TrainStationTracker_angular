import { Component } from '@angular/core';
import { AdminService, User } from 'src/app/Services/admin.service';

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
  searchTerm: string = '';  // Initialize the searchTerm property

  ngOnInit(): void {
    this.AdminService.getNumberOfBookedTrips().subscribe(data => this.numberOfBookedTrips = data);
    this.AdminService.getNumberOfTrainStations().subscribe(data => this.numberOfTrainStations = data);
    this.AdminService.getNumberOfActiveTrips().subscribe(data => this.numberOfActiveTrips = data);
    this.AdminService.getNumberOfUsers().subscribe(data => this.numberOfUsers = data);
    this.AdminService.getTotalRevinue().subscribe(data => this.totalRevinue = data);
    this.loadUsers();
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