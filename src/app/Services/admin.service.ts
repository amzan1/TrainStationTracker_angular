import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface User {
  userid: number;
  username: string;
  password: string;
  email: string;
  roleid: number;
  createdat: Date;
  firstname: string;
  lastname: string;
  role: number; // Adjust this type based on the actual 'role' structure
  bookings: any[];
  testimonials: any[];
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}
  numOfBookedTripsUrl = 'https://localhost:7159/api/Statistics/GetNumberOfBookedTrips';
  numOfTrainStationsUrl ='https://localhost:7159/api/Statistics/GetNumberOfTrainStations';
  numOfActiveTripsUrl = 'https://localhost:7159/api/Statistics/GetNumberOfTrips';
  numOfUsersUrl = 'https://localhost:7159/api/Statistics/GetNumberOfUsers';
  totalRevinueUrl = 'https://localhost:7159/api/Statistics/GetTotalPrice';
  getAllUsersUrl = 'https://localhost:7159/api/Login/GetAllUsers';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUsersUrl);
  }

  getNumberOfBookedTrips(): Observable<number> {
    return this.http.get<number>(this.numOfBookedTripsUrl);
  }

  getNumberOfTrainStations(): Observable<number> {
    return this.http.get<number>(this.numOfTrainStationsUrl);
  }

  getNumberOfActiveTrips(): Observable<number> {
    return this.http.get<number>(this.numOfActiveTripsUrl);
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>(this.numOfUsersUrl);
  }

  getTotalRevinue(): Observable<number> {
    return this.http.get<number>(this.totalRevinueUrl);
  }
}